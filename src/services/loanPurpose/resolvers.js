export default {
  Query: {
    categories: (_, args, { dataSources, ...user }) => {
      return dataSources.CategoryAPI.getCategories({
        user,
        ...args,
      });
    },
  },
};
