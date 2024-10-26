# Starship Finder

**Starship Finder** is a web application that allows users to search for starships from the Star Wars universe. It leverages the [SWAPI (Star Wars API)](https://swapi.dev/) to fetch starship data and uses MongoDB for storing search queries.

## Features

- Search for starships by name
- Display starship details like model, manufacturer, and crew capacity
- Store and track user search queries in MongoDB

## Tech Stack

- **Backend:** Java, Spring Boot
- **Frontend:** React
- **Database:** MongoDB
- **API:** SWAPI (Star Wars API)

## Prerequisites

Before you begin, ensure you have the following installed:

- Java 21 or higher (for backend)
- Node.js and npm (for frontend)
- MongoDB (local or remote instance)

## Environment Setup

The application uses environment variables to manage sensitive data like database connection strings. You can configure these variables in a `.env` file in the root directory of your backend.

### Backend (.env)

1. Create a `.env` file in the `backend` directory.
2. To help set up your own `.env` file, there is a template provided named `.env.template`. 

### Steps to use `.env.template`:

1. Copy the `.env.template` file and rename it to `.env`.
```bash
cp .env.template .env
```

2. Open the newly created .env file and replace the placeholder values with your actual configuration.

### Backend (.env)

1. Create a `.env` file in the `backend` directory.
2. Add the following environment variable:

   ```bash
   MONGODB_URI=mongodb://localhost:27017/starship_queries

### Frontend (proxy)

The frontend needs to communicate with the backend running on a different port. Ensure that the `package.json` in your React project contains the following:

```json
"proxy": "http://localhost:8080"
```

This ensures API calls from React (on port 3000) are correctly proxied to the Spring Boot backend (on port 8080).

## How to Launch the Project

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/starship_finder.git
cd starship_finder
```

### 2. Launch the Backend

Navigate to the backend directory:
```bash
cd ./backend
```

Build and run the backend:
```bash
mvn clean install
mvn spring-boot:run
```

The backend should now be running on `http://localhost:8080`

### 3. Launch the Frontend

Navigate to the frontend directory:
```
cd ./frontend
```

Install dependencies and start the React app:
```bash
npm install
npm start
```
The frontend will be available at `http://localhost:3000`

## Usage
- Open your browser and navigate to `http://localhost:3000`.
- Enter a starship name in the search bar and see the results.
- Search queries will be saved in the MongoDB database.

## Project Structure
- `backend/` - Spring Boot application that handles API requests and connects to MongoDB.
- `frontend/` - React application for the UI.
- `.env` - Environment variables for the backend.