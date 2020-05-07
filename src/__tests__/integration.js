import { createTestClient } from "apollo-server-testing";
import { ApolloServer } from "apollo-server";
import gql from "graphql-tag";
import schema from "../schema";
import dataSources from "../dataSources";
import { createConnection, getConnection } from "typeorm";
import dbConfig from "../config/db.config";

const apolloServer = new ApolloServer({
  schema,
  context: ({ req }) => {
    return {
      dataSources,
      req,
    };
  },
});

const GET_CLIENTS = gql`
  query {
    clients {
      nodes {
        id
        firstName
        lastName
      }
    }
  }
`;

beforeAll(async () => {

  //different database can be used
  await createConnection(dbConfig.development);
});

afterAll(async () => {
  await getConnection().close();
});

describe("Queries", () => {
  it("fetches all clients", async () => {
    const { query } = createTestClient(apolloServer);
    const res = await query({ query: GET_CLIENTS });


    //snapshot can be defined
    //expect(res).toMatchSnapshot();

    //example tests
    expect(res.data).not.toBeNull();
    expect(res.data.clients).toBeDefined();
    expect(res.data.clients).not.toBeNull();
    expect(res.data.clients.nodes).not.toBeNull();
    expect(res.data.clients.nodes).toHaveLength(1);
  });
});
