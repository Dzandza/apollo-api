export default {
  Query: {
    brands: (_, args, { dataSources, ...user }) => {
      return dataSources.BrandAPI.getBrands({
        user,
        ...args,
      });
    },
  },
};
