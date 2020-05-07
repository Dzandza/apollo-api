import DataLoader from 'dataloader';
import { query, querySingle, buildWhereIn } from '@oracledb/helpers';

// Ensures select fields are consistent across queries.
// Names are enclosed in quotation marks so that returned fields
// are consistent with javascript nameing conventions.
const addSelectToCustomerRouteQuery = () =>
  `id "id", subjekt "customer", putnik "salesman", dan "dayOfVisit", frekvencija "frequency",
   trunc(sysdate, 'iw') + dan - 1 "nextVisit"`;

// Ensures where clause is consistent across queries
const addWhereToCustomerRouteQuery = () => {
  return `(:salesman IS NULL OR putnik=:salesman) AND
          (floor(mod(sysdate-datum_zadnje_narudzbe,frekvencija * 7)) = 0 OR
          (datum_zadnje_narudzbe IS NULL AND (mod(to_char(sysdate, 'J'), 7) + 1) = dan))`;
};

export const getCustomerRoutes = async ({ user }) => {
  const sql = `
  SELECT ${addSelectToCustomerRouteQuery()}
    FROM ro_rute
    WHERE ${addWhereToCustomerRouteQuery()}
  ORDER BY redoslijed nulls last`;

  const countSql = `
    SELECT count(*) "totalCount"
    FROM ro_rute
    WHERE ${addWhereToCustomerRouteQuery()}`;
  const binds = { salesman: user.id };

  const nodes = await query(sql, binds);
  const { totalCount } = await querySingle(countSql, binds);

  return { nodes, totalCount };
};

/**
 * Loaders
 *
 * Loaders in conjunction with dataloader (https://github.com/graphql/dataloader)
 * are used to solve the N+1 query problem present in GraphQL resolvers.
 */

export const loadCustomerRouteByCustomer = (user) =>
  new DataLoader(
    async (keys) => {
      const { sql: whereInSql, binds } = buildWhereIn(keys, 'subjekt');
      const sql = `
        SELECT ${addSelectToCustomerRouteQuery()}
        FROM ro_rute
        WHERE putnik=:salesman AND ${whereInSql}`;

      const rows = await query(sql, { salesman: user.id, ...binds });

      return keys.map((key) => rows.find(({ customer }) => customer === key));
    },
    { cache: false },
  );
