## Configurations

1. Run the following command to ensure you are on the correct version of node. Ensure you have node version manager installed.
```bash
$ nvm use
```
2. Add a `.env` file at the root of the project directory.
3. Within the `.env` file, enter the environment variables for
```bash
LISTEN_PORT       # The port used for the app. Defaults to 8080.
CORS_ORIGIN       # The specific origin you want to be able to access this nestjs app ie. http://localhost:8080
MONGODB_HOST      # Include port number here if needed ie. 'localhost:27017'.
MONGODB_PROTOCOL  # Either 'mongodb' or 'mongodb+srv'. Defaults to 'mongodb'.
MONGODB_DATABASE  # Name of database used in mongo.
MONGODB_USERNAME  # Depends on your authentication, might not be needed.
MONGODB_PASSWORD  # Depends on your authentication, might not be needed.
JWT_SECRET        # Secret used to sign JWT
```

## Installation

```bash
$ npm install
```

## Running the app

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

# test coverage
$ npm run test:cov
```
