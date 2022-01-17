# Job Posting REST application with MikroORM and NestJS

## Running the application

    docker-compose up

Then the app will be accessible on http://localhost:8080

## Test

The unit test is run using a fake db (sqlite db)

    npm run test

Or run it inside container

    docker-compose run backend run test
