export default {
  development: {
    name: "default",
    type: "postgres",
    host: "localhost", 
    port: 5432,
    username: "admin", //local database
    password: "admin", //credentials
    database: "postgres",
    schema: "public",
    synchronize: false,
    entities: ["src/entities/*.js"],
  },
};
