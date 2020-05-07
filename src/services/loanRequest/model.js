import DataLoader from 'dataloader';
import { query, buildSearchQuery, buildWhereIn } from '@oracledb/helpers';
import { addFavouritesToProductQuery } from '../product/model';

export const getBrands = async ({
  searchValue = '',
  category,
  customer,
  favourites,
  discounted,
  user,
}) => {
  const { searchQuery, searchBinds } = buildSearchQuery(
    searchValue,
    'ro_artikli.naziv',
  );

  const { favouritesSql } = addFavouritesToProductQuery(customer, favourites);

  const sql = `
  SELECT id "id", naziv "name", sifra "code", "productCount"
  FROM ro_brendovi INNER JOIN
  (SELECT brend, count(*) "productCount"
  FROM ro_artikli INNER JOIN ro_zalihe ON ro_artikli.id = ro_zalihe.artikal ${favouritesSql}
  WHERE ro_artikli.aktivan = 'D' AND nvl(ro_artikli.vlasnistvo, 'N') = 'D' AND 
  nvl(ro_zalihe.blokiran_narudzba, 'N') != 'D' AND ro_zalihe.organizacija = :organization AND
  (:category IS NULL OR robnagrupa IN (SELECT id
    FROM ro_robnegrupe
    START WITH id = :category 
    CONNECT BY PRIOR id = nadredjena)) AND
    ${searchQuery}
    ${
      discounted
        ? 'AND (SELECT db_pkg_uslovi_prodaje_rabati.f_rabat2(ro_artikli.id, :customer) FROM dual) > 0'
        : ''
    }
    AND (NOT EXISTS(SELECT 1 FROM su_subjekti_brendovi SU_SUBJEKTI_BRENDOVI WHERE subjekt = :salesman) OR
           EXISTS(SELECT 1 FROM SU_SUBJEKTI_BRENDOVI WHERE subjekt = :salesman AND su_subjekti_brendovi.brend = ro_artikli.brend))
    GROUP BY brend HAVING count(*) > 0) filtriraniBrendovi ON ro_brendovi.id=filtriraniBrendovi.brend
    ORDER BY naziv`;

  const binds = {
    organization: user.supplyOrganization,
    category,
    salesman: user.id,
    ...((favourites || discounted) && customer && { customer }),
    ...searchBinds,
  };

  return query(sql, binds);
};

export const loadBrandById = new DataLoader(
  async (keys) => {
    const { sql: whereInSql, binds } = buildWhereIn(keys, 'id');
    const sql = `
      SELECT id "id", naziv "name", sifra "code"
      FROM ro_brendovi 
      WHERE ${whereInSql}`;

    const rows = await query(sql, binds);

    return keys.map((key) => rows.find(({ id }) => id === key));
  },
  { cache: false },
);
