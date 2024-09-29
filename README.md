# Bookstore Rental System

A full-stack web application where users can rent books and return them by paying the total rent based on the number of days. Each book has a rent-per-day rate. Built with the MERN (MongoDB, Express.js, React.js, Node.js) stack.

## Features

- **User Registration & Authentication**: Users can sign up and log in.
- **Book Catalog**: View a list of available books for rent.
- **Issue Book**: Users can issue a book for rent.
- **Rent Calculation**: The total rent is calculated based on the rent per day and the number of days the book is issued.
- **Return Book**: Users can return a book and pay the total calculated rent.

## Technologies Used

### Frontend:
- **React.js**: For building the user interface.
- TailwindCSS**: For styling the application.

### Backend:
- **Node.js**: For handling the server-side logic.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **MongoDB**: For storing book data and user information.
- **Mongoose**: To interact with MongoDB.

### Other:
- **JWT (JSON Web Tokens)**: For authentication and user sessions.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bookstore-rental-system.git
   ```

2.	Install dependencies for both frontend and backend:
    - Frontend
       ```bash
       cd client
       npm install
       ```
    - Backend
       ```bash
       cd server
       npm install
       ```
3.	Set up environment variables:

    Create a .env file in the server folder and add the following:
  	```bash
     PORT=<your_port_number>
     MONGO_URI=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret_key>
    ```
4. Run the application:
   - Frontend
     ```bash
     cd client
     npm run dev
     ```
   - Frontend
     ```bash
     cd server
     npm run dev
     ```

## API Endpoints

### Authentication
- **POST** /api/auth/signup -> Sign up a new user
- **POST** /api/auth/login -> Log in the existing user
- **POST** /api/auth/logout -> Log out the user
- **GET** /api/auth/ -> Get all the users
- **GET** /api/auth/:id -> Get a User

### Books
- **GET** /api/books -> Get all the books
- **GET** /api/books/:id -> Get a book
- **GET** /api/books/search -> Get the books containing the term
- **GET** /api/books/range -> Get the books within a price range
- **GET** /api/books/searchAndRange -> Get the books with both a term and a price range

### Transactions
- **GET** /api/transactions/ -> Get all the transactions
- **GET** /api/transactions/:bookId -> Get all the people who have borrowed that book
- **POST** /api/transactions/add -> Issue a book
- **DELETE** /api/transactions/return -> Return the book

Feel free to clone, contribute, and report any issues. Happy Coding!
