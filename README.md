# Job Posting REST application with MikroORM and NestJS

## Running the application

    docker-compose up

Then the app will be accessible on http://localhost:8080

GET http://localhost:8080
GET http://localhost:8080/:id
PUT http://localhost:8080/:id
POST http://localhost:8080/:id
DELETE http://localhost:8080/:id

## Test

The unit test is run using a fake db (sqlite db), you can run it directly inside the container

    npm run test

Or run it inside container

    docker-compose run backend run test
