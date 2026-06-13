# CineVerse

CineVerse is a full-stack cinema booking application with a React frontend, a Spring Boot authentication service, and a Spring Cloud API gateway that routes requests to the movie and booking services.

## Features

- Customer-facing booking flow for movies, locations, theatres, screens, showtimes, and seats
- Role-based access for customers, theatre owners, and admins
- Secure authentication with JWT-based login and registration
- Gateway-based backend architecture for modular service routing

## Project Structure

- frontend/ - React + Vite client application
- backend/auth-service/ - Authentication and user management service
- backend/movie-service/ - Movie-related API service
- backend/booking-service/ - Booking-related API service
- backend/api-gateway/ - Spring Cloud Gateway for routing and auth validation

## Tech Stack

- Frontend: React, Vite, React Router
- Backend: Java 17, Spring Boot 3, Spring Security, Spring Cloud Gateway
- Database: PostgreSQL (production-ready) and H2 (development-friendly)

## Prerequisites

Make sure the following are installed:

- Java 17+
- Maven 3.8+
- Node.js 18+
- npm

## Backend Setup

Open separate terminals for each backend service and run:

```bash
cd backend/auth-service
mvn package
java -jar target/auth-service-1.0.0.jar
```

```bash
cd backend/movie-service
mvn package
java -jar target/movie-service-1.0.0.jar
```

```bash
cd backend/booking-service
mvn package
java -jar target/booking-service-1.0.0.jar
```

```bash
cd backend/api-gateway
mvn package
java -jar target/api-gateway-1.0.0.jar
```

Expected ports:

- Auth service: 8080
- Movie service: 8082
- Booking service: 8083
- API gateway: 8081

## Frontend Setup

From the project root:

```bash
cd frontend
npm install
npm run dev
```

Then open:

- http://localhost:3000/

## Running the App

You need to start both the frontend and backend separately:

1. Start the backend services as shown above.
2. Start the frontend with `npm run dev`.
3. Open the frontend URL in your browser.

## Authentication Notes

The app uses the auth service for:

- Registering users
- Logging in users
- Returning JWT tokens for authenticated sessions

## Notes

- The frontend is designed to work with the running backend services.
- If you want to use a local database configuration, ensure the application properties are set appropriately for your environment.

## License

This project is for educational and demonstration purposes.
