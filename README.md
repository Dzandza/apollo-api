# apollo-api
Apollo-graphql API with TypeORM and service testing with Jest

## Setup
- Install dependecies with `yarn` or `yarn install`
- Compile typescript with `yarn check-types`
- Add database credentials in src/config/db.config.js
- Add .env file with NODE_ENV and PORT values (defaults are *development* and *5000*)

## Running the app
- Make sure that NODE_ENV value is **not** test
- Run with `yarn start`

## Testing the app
- Tests were written following this example: 
  https://github.com/apollographql/fullstack-tutorial/tree/master/final/server/src
- Add test database credentials in src/config/db.config.js (optional)
- Make sure that NODE_ENV value **is** test
- Run with `yarn test`
