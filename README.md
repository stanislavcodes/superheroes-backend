# Superheroes REST API

The Superheroes API is a RESTful web service that provides functionalities for managing superheroes. It allows users to perform CRUD (Create, Read, Update, Delete) operations on superhero entities. The API is built using Node.js, Express.js, and MongoDB (or any other database of your choice).

### Key Features:
- **Get All Superheroes**: Retrieve a paginated list of all superheroes with options for pagination.
- **Get Superhero by ID**: Retrieve a specific superhero by their unique ID.
- **Create Superhero**: Create a new superhero by providing their nickname, real name, origin description, superpowers, catch phrase, and images.
- **Update Superhero**: Update the information of an existing superhero identified by their ID.
- **Delete Superhero**: Delete a superhero from the database based on their ID.

#### Error handling and validation

The API follows best practices for error handling, input validation, and data persistence. It utilizes the Zod library for data validation and ensures that all required fields are provided when creating or updating a superhero.

In addition to the API endpoints, the project includes unit tests using **Jest** and **supertest** to verify the functionality of the API's routes and controllers. The tests cover various scenarios, including retrieving superheroes, creating superheroes, updating superheroes, and deleting superheroes.

## Using the Superheroes API

Endpoints of Superheroes API:

1. `GET /superheroes`: Retrieves a paginated list of all superheroes.
2. `GET /superheroes/:id`: Retrieves a specific superhero by their unique ID.
3. `POST /superheroes`: Creates a new superhero with provided data in the request body.
4. `PUT /superheroes/:id`: Updates the information of an existing superhero identified by their ID.
5. `DELETE /superheroes/:id`: Deletes a superhero from the database based on their ID.
6. `GET /superheroes/count`: Retrieves the total count of superheroes in the database.
7. `GET /healthcheck`: Returns a 200 status to indicate that the API is running and healthy.

The endpoints are designed to be intuitive and follow RESTful conventions, allowing developers to easily interact with the API and perform the necessary operations for superhero management.

## How to run locally

### 1. Clone repo and install dependencies

Clone the repository:

```bash
git clone https://github.com/stanislavcodes/superheroes-backend.git
```

Install the dependencies:

```bash
cd superheroes-backend
npm install
```

Set `.env` file (see .env.example):

- Add URL to your PostgreSQL Database (for other db's check out the [Prisma docs](https://www.prisma.io/docs))

### 2. Create and seed the database

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.


### 3. Start the server

```
npm run dev
```

The server is now running on `http://localhost:3000`!

### *4. Testing

Run the following command run tests

```
npm run test
```

## Author

[@stanislavcodes](https://github.com/stanislavcodes) | Stanislav Korchevskyi 
