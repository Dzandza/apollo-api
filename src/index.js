import { ApolloServer } from "apollo-server";
import { createConnection } from "typeorm";
import schema from "./schema";
import dbConfig from "./config/db.config";
import "./config/env";
import dataSources from "./dataSources";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

const startServer = async () => {
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {
      return {
        dataSources,
        req,
      };
    },
  });

  if (process.env.NODE_ENV !== "test") {
    await createConnection(dbConfig.development);
    apolloServer.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  }
};

startServer();