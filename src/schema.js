import { merge } from "lodash";
import { gql, makeExecutableSchema } from "apollo-server";

// Type defs
import { clientTypeDef, scalarTypeDef } from "./services";

// Resolvers
import { clientResolvers, scalarResolvers } from "./services";

const Query = gql`
  type Query {
    _empty: String
  }
`;

const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;

export default makeExecutableSchema({
  typeDefs: [Query, Mutation, scalarTypeDef, clientTypeDef],
  resolvers: merge({}, scalarResolvers, clientResolvers),
});
