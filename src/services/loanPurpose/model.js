// import DataLoader from 'dataloader';
import { query, buildSearchQuery, buildWhereIn } from '@oracledb/helpers';
import { addFavouritesToProductQuery } from '../product/model';

export const getCategories = async ({
  searchValue = '',
  brands,
  favourites,
  customer,
  user,
  discounted,
}) => {
  const { searchQuery, searchBinds } = buildSearchQuery(
    searchValue,
    'ro_artikli.naziv',
  );
  const { sql: brandWhereIn, binds: brandWhereInBinds } = buildWhereIn(
    brands,
    'brend',
  );

  const { favouritesSql } = addFavouritesToProductQuery(customer, favourites);

  const sql = `
  SELECT id "id", naziv "name", sifra "code", "productCount"
  FROM ro_robnegrupe INNER JOIN
  (SELECT robnagrupa, count(*) "productCount"
  FROM ro_artikli INNER JOIN ro_zalihe ON ro_artikli.id = ro_zalihe.artikal ${favouritesSql}
  WHERE ro_artikli.aktivan = 'D' AND nvl(ro_artikli.vlasnistvo, 'N') = 'D' AND 
  nvl(ro_zalihe.blokiran_narudzba, 'N') != 'D' AND ro_zalihe.organizacija = :organization AND
    ${searchQuery}
    ${brandWhereIn.length > 0 ? `AND ${brandWhereIn}` : ''}
    ${
      discounted
        ? 'AND (SELECT db_pkg_uslovi_prodaje_rabati.f_rabat2(ro_artikli.id, :customer) FROM dual) > 0'
        : ''
    }
    AND (NOT EXISTS(SELECT 1 FROM su_subjekti_brendovi SU_SUBJEKTI_BRENDOVI WHERE subjekt = :salesman) OR
           EXISTS(SELECT 1 FROM SU_SUBJEKTI_BRENDOVI WHERE subjekt = :salesman AND su_subjekti_brendovi.brend = ro_artikli.brend))
    GROUP BY robnagrupa HAVING count(*) > 0) filtriraneKategorije ON ro_robnegrupe.id=filtriraneKategorije.robnagrupa
    ORDER BY naziv`;

  const binds = {
    organization: user.supplyOrganization,
    salesman: user.id,
    ...((favourites || discounted) && customer && { customer }),
    ...searchBinds,
    ...brandWhereInBinds,
  };

  return query(sql, binds);
};
