export default {
  Query: {
    clients: (_, args, { dataSources }) => {
      return dataSources.ClientAPI.getClients(args);
    },
  },
  Mutation: {
    createClient: (_, args, { dataSources }) => {
      return dataSources.ClientAPI.createClient(args);
    },
    updateClient: (_, args, { dataSources }) => {
      return dataSources.ClientAPI.updateClient(args);
    },
    deleteClient: (_, args, { dataSources }) => {
      return dataSources.ClientAPI.deleteClient(args);
    },
  },
};
