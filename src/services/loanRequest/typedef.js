import gql from 'graphql-tag';

export default gql`
  extend type Query {
    brands(
      client: ID
      searchValue: String
      category: ID
      favourites: Boolean
      discounted: Boolean
    ): [Brand]
  }

  type Brand {
    id: ID
    name: String
    code: String
    productCount: Int
  }
`;
