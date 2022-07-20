# Invygo Task - Staff Scheduling application
A task is to provide staff Scheduling application with Roles

## Installation

```bash
$ npm install
```

## Running the app
copy `.env.example` to `.env` and set database connection strings

To bootstrap the database tables:

```bash
npx sequelize-cli db:migrate --url 'mysql://invygo:invygo@localhost/invygo'
```
**Note:** consider changing the mysql URL

To run the application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```