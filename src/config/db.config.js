export default {

  //local dev database settings
  development: {
    name: "default",
    type: "postgres",
    host: "localhost", 
    port: 5432,
    username: "admin", 
    password: "admin", 
    database: "postgres",
    schema: "public",
    synchronize: false,
    entities: ["src/entities/*.js"],
  },
};
