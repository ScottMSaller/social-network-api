# social-network-api

## Description
The **social-network-api** is a server-side API built with Express and Mongoose that allows users to share thoughts, react to others' thoughts, and add or remove friends. This API supports CRUD operations for users, thoughts, and reactions, providing an easy way to manage social interactions in a database-driven application.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Thought Endpoints](#thought-endpoints)
  - [Reaction Endpoints](#reaction-endpoints)
- [License](#license)

## Installation
1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/your-username/social-network-api.git
    ```
2. Navigate to the project directory:
    ```bash
    cd social-network-api
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Set up your environment variables:
    - Create a `.env` file in the root of your project.
    - Add your MongoDB URI like this:
      ```bash
      MONGODB_URI=mongodb://localhost:27017/socialNetworkDB
      ```

5. Seed the database if necessary:
    ```bash
    npm run seed
    ```

6. Start the server:
    ```bash
    npm start
    ```

## Usage
Once the server is running, you can access the API endpoints using a tool like Postman or your browser. The API allows you to create, read, update, and delete users, thoughts, and reactions to those thoughts.

## API Endpoints
Below is the documentation for the API endpoints, including the HTTP methods and required data to interact with the database.

### User Endpoints
#### `/api/users`
- **GET**: Retrieves all users.
- **POST**: Creates a new user.
  - Request body should include:
    ```json
    {
      "username": "string",
      "email": "string"
    }
    ```

#### `/api/users/:userId`
- **GET**: Retrieves a single user by their ID.
- **DELETE**: Deletes a user by their ID.

#### `/api/users/:userId/friends/:friendId`
- **POST**: Adds a friend to a user.
- **DELETE**: Removes a friend from a user.

### Thought Endpoints
#### `/api/thoughts`
- **GET**: Retrieves all thoughts.
- **POST**: Creates a new thought.
  - Request body should include:
    ```json
    {
      "thoughtText": "string",
      "username": "string"
    }
    ```

#### `/api/thoughts/:thoughtId`
- **GET**: Retrieves a thought by its ID.
- **PUT**: Updates a thought by its ID.
- **DELETE**: Deletes a thought by its ID.

### Reaction Endpoints
#### `/api/thoughts/:thoughtId/reactions`
- **POST**: Adds a reaction to a thought.
  - Request body should include:
    ```json
    {
      "reactionBody": "string",
      "username": "string"
    }
    ```

#### `/api/thoughts/:thoughtId/reactions/:reactionId`
- **DELETE**: Deletes a reaction by its ID.

## License
This project is licensed under the Apache-2.0 License.
