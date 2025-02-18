# Ebuddy Test Project

This project is a full-stack web application that demonstrates user authentication, registration, and data management using Firebase services. The backend is built with Node.js, Express, and Firebase, while the frontend utilizes Next.js and React.

## Project Structure

The project is organized into two main directories:

- `apps/backend-repo`: Contains the backend code.
- `apps/frontend-repo`: Contains the frontend code.

## Backend

The backend is developed using Node.js and Express, leveraging Firebase for authentication and Firestore for data storage.

### Key Files

- `server.ts`: The main entry point for the backend server.
- `routes/user.route.ts`: Defines the routes for user-related operations.
- `controller/index.ts`: Contains the controller logic for handling user operations.
- `middleware/auth.middleware.ts`: Middleware for handling authentication.
- `repository/user.repo.ts`: Repository for interacting with Firestore.
- `config/firebase.ts`: Configuration for initializing Firebase.

### API Routes

The backend exposes several API routes for user management:

- **POST `/auth/register`**: Registers a new user.
- **POST `/auth/login`**: Authenticates a user and returns a JWT.
- **PUT `/update-user-data`**: Updates user information.
- **GET `/fetch-user-data`**: Retrieves data for all users; protected by JWT authentication.
- **GET `/fetch-user-data/me`**: Retrieves data for the authenticated user; protected by JWT authentication.

### Authentication Middleware

The `auth.middleware.ts` file contains middleware that verifies JWT tokens to protect certain routes. It ensures that only authenticated users can access specific endpoints by validating the token present in the request headers.

## Frontend

The frontend is built with Next.js and React, providing a seamless user experience. It interacts with the backend API to perform authentication and data retrieval operations.

### Pages

The frontend includes the following pages:

1. **Registration Page**: Allows new users to register by interacting with the `/auth/register` endpoint.
2. **Login Page**: Enables existing users to log in by sending credentials to the `/auth/login` endpoint.
3. **Home Page**: Displays user information by fetching data from `/fetch-user-data/me` for the current user's data and `/fetch-user-data` for all users' data.
4. **Edit Page**: Provides functionality for users to update their information via the `/update-user-data` endpoint.

### Integration with Backend

Each page communicates with the backend API using HTTP requests, handling responses appropriately to provide a responsive and interactive user interface.

## Deployment

To deploy this project, ensure that both the backend and frontend are properly configured with your Firebase project credentials. Deploy the backend server to a Node.js-compatible hosting service and the frontend to a platform that supports Next.js applications.

## Running the Application

To run both the backend and frontend concurrently during development:

1. **Install Dependencies**: Navigate to the root directory of your project and install the necessary development dependencies:

   ```bash
   npm install concurrently --save-dev

2. **Run the Application**: Start both the backend and frontend servers simultaneously using the following command: 

   ```bash
   npm run dev-all

## Resolving Port Conflicts 
Can use the kill-port package to kill the process occupying a specific port: 
  
   ```bash
   npx kill-port <port_number>

THEN TRY AGAIN



# Firestore Query for Multi-Factor Ranking

To implement a multi-factor ranking system in Firestore based on the factors you mentioned, we can't directly combine them into a single compound index for the "totalAverageWeightRatings", "numberOfRents", and "recentlyActive" fields. Firestore allows multi-field sorting but only in a hierarchical manner, which limits the ability to truly prioritize them simultaneously.

However, we can combine these factors in a more efficient way for Firestore by using a **custom scoring system** and leveraging a single composite score that incorporates all three factors into one.

### Suggested Approach:

1. **Define a Custom Score**:  
   Create a field, say `userScore`, that combines the three factors into a single value. This score can be calculated based on a formula that assigns appropriate weights to each of the three fields (since you prioritize them differently).

   A possible scoring formula could be:

userScore = (totalAverageWeightRatings * 0.5) + (numberOfRents * 0.3) + (recentlyActive / 10^9 * 0.2)

This formula prioritizes **totalAverageWeightRatings** (50% weight), followed by **numberOfRents** (30% weight), and lastly **recentlyActive** (20% weight), where `recentlyActive` is normalized to a scale that fits into the formula by dividing by \(10^9\) (to scale the epoch time).

2. **Firestore Query**:  
After storing this `userScore` field for each document, you can easily query for the highest potential users in descending order of `userScore`, like so:

```javascript
db.collection("USERS")
  .orderBy("userScore", "desc")
  .limit(10); // Adjust the limit for pagination as needed
  
  This will return the top users based on the combination of all three factors, sorted in the desired order.


# Personality & Technical Questions

## 1. Most Difficult Technical Problems:

Some of the hardest challenges I have faced are related to **scalability** and **data consistency**. In one project, I had to design a system with a highly dynamic dataset where records were frequently updated in real-time. The challenge was to ensure that these updates were consistent across a distributed system without causing data loss or performance degradation. I tackled this by implementing **event-driven architecture** with **message queues** to handle updates efficiently and maintain consistency. I also relied on **transactional integrity** to prevent conflicts when multiple services tried to update the same record simultaneously.

## 2. Project Approach:

When working on a project, I typically follow a **structured and agile approach**:

- **Requirement Gathering & Planning**: Understand the project's functional requirements, define user stories, and break down the work into tasks.
- **Implementation**: Write clean, well-documented code and frequently commit to version control.
- **Deployment & Monitoring**: Deploy the system and use monitoring tools to keep track of performance and bugs.

## 3. Learning a New Topic:

To learn a new topic effectively, I:

- **Start with the basics** and work my way up to more advanced concepts.
- **Use a mix of learning methods**, including reading documentation, watching tutorials, and practicing hands-on.
- **Build small projects** as I learn to apply what I've absorbed.


## 4. "Consistency" vs "Fast & Efficient":

I value **consistency** more. While speed is important, ensuring that the system remains reliable, scalable, and maintainable in the long run is essential.

## 5. Apple Products:

No

## 6. Immediate Availability:

I can start as soon as **5th March**. If there are any onboarding processes or preparations, I can begin those immediately.
