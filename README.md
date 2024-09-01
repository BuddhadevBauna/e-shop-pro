# eCommerce Application


## Overview
This project is an eCommerce web application developed using React.js for the frontend, Express.js for the backend, and Mongoose with MongoDB for the database. The application allows users to browse, search, filter, and sort products. Administrators have the capability to manage products and categories through a dedicated admin panel.


## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables Setup](#environment-variables-setup)
- [Run the Application](#run-the-application)
- [Authentication and Authorization](#authentication-and-authorization)


## Features
- **User Features:**
  - User authentication and authorization
  - Products browsing and detailed view
  - Products search functionality
  - Products filtering and sorting by various criteria
  - Shopping cart management

- **Admin Features:**
  - Product management (CRUD operations)
  - Category management (CRUD operations)


## Technologies Used
- **Frontend:**
  - React.js
  - Redux Toolkit
  - React Router
  - Axios

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose


## Installation
- **Prerequisites:**
  - Node.js
  - npm
  - MongoDB

**Clone Repository:**
```bash
  git clone https://github.com/BuddhadevBauna/e-shop-pro.git
  cd online-shopping
```

**Install depandencies for frontend:**
```bash
  cd client
  npm install
```

**Install depandencies for backend:**
```bash
  cd ../server
  npm install
```


## Environment Variables Setup
- **Create a .env file in the backend directory and add the following:**
  - MONGODB_URI=your_mongodb_connection_string
  - JWT_SECRET_KEY=your_jwt_secret


## Run the Application
- **Frontend:**
```bash
  cd ../client
  npm run dev
```

- **Backend:**
```bash
  cd ../server
  npm start
```


## Authentication and Authorization
- JWT Token: Used for securing API endpoints.
- Login: POST /auth/login returns a JWT token.
- Register: POST /auth/register returns a JWT token.
- Protected Routes: Include Authorization: Bearer <your_jwt_token> header for accessing protected endpoints (examples, profile, product management).
- Admin Routes: Restricted to users with valid JWT tokens.
