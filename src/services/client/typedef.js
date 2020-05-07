import gql from 'graphql-tag';

export default gql`
  extend type Query {
    clients(
      limit: Int
      offset: Int
    ): ClientConnection
  }

  extend type Mutation {
    createClient(client: ClientInput!): ID
    deleteClient(clientId: ID!): ID
    updateClient(clientId: ID!, client: ClientInput!): ID
  }

  type ClientConnection {
    nodes: [Client]!
    totalCount: Int
  }

  type Client {
    id: ID
    firstName: String
    lastName: String
    jmbg: String
    lk: String
    phoneNumberMobile: String
    phoneNumberFixed: String
    householdSize: Int
  }

  input ClientInput {
    firstName: String!
    lastName: String
    jmbg: String!
    lk: String!
    phoneNumberMobile: String
    phoneNumberFixed: String
    householdSize: Int
  }
`;
