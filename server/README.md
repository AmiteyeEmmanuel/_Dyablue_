
---

# Hairstylist Booking Platform API

This is the backend API for a hairstylist booking platform. It provides endpoints for managing users, hairstylists, bookings, notifications, and authentication.

## Technologies Used

- Node.js
- Express
- PostgreSQL

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/BOOK_ME.git
   ```

2. Install dependencies:
   ```
   cd server
   npm install
   ```

3. Set up the PostgreSQL database:
   - Create a new PostgreSQL database.
   - Update the database configuration in `database.js`.

4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Define the following variables in `.env`:
     ```
     POSTGRES_USERNAME=database_user
     POSTGRES_DATABASE==your_database_name
     POSTGRES_PASSWORD==your_database_password
     JWT_SECRET==your_jwt_secret
     ```

5. Run the migration to create database tables:
   ```
   npm run migrate
   ```

6. Start the server:
   ```
   npm start
   or 
   npm run dev : To start server with nodemon
   ``

## Authentication

- JWT (JSON Web Tokens) are used for authentication.
- Include the JWT token in the Authorization header for protected routes:
  ```
  Authorization: Bearer your_jwt_token
  ```

## Error Handling

- Errors are returned in JSON format with appropriate status codes and messages.
- Global error handling middleware is used to catch and handle exceptions.

---