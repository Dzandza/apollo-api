import gql from 'graphql-tag';

export default gql`
  extend type Query {
    categories(
      client: ID
      searchValue: String
      brands: [ID]
      favourites: Boolean
      discounted: Boolean
    ): [Category]
  }

  type Category {
    id: ID
    name: String
    code: String
    productCount: Int
  }
`;
