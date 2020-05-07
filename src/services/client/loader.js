import { getClients } from './model';
import createLoader from '../../utils/createLoader';

export const __createClientLoader = createLoader((clients) =>
  getClients(clients),
);

export default () => {
  throw new Error(
    '⚠️ Do not import loaders directly, get them from the GraphQL context instead! ⚠️',
  );
};
