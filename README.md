**Exam Portal**
A full-stack web application for an online examination portal. This project consists of two main components: a Node.js/Express backend and a React.js frontend.



**Features**
User Authentication: Secure user registration and login with JWT.

Timed Exams: A timer component to track the duration of the exam.

Question Navigation: Ability to navigate between questions.

Answer Submission: Submission of answers to the backend.

Score Calculation: Display of results with correct and incorrect answers.

Responsive Design: The frontend is designed to be accessible on various devices.

**Project Structure**
The repository is organized into two main directories:

exam-backend: Contains the server-side code, including API routes, database models, and authentication logic.

exam-portal: Contains the client-side code for the user interface, built with React.js.


**Getting Started**
Follow these steps to set up and run the project on your local machine.

**1. Backend Setup**
Navigate to the backend directory in your terminal:

cd exam-backend

Install the required Node.js packages:

npm install
# or
yarn install

Create a .env file in the exam-backend directory and add the following environment variables. Replace the placeholder values with your actual configuration.

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_very_secure_secret_key_for_jwt

PORT: The port on which the backend server will run.

MONGO_URI: The connection string for your MongoDB database.

JWT_SECRET: A secret key for signing JSON Web Tokens (JWTs) used for authentication.

Start the backend server:

npm start
# or
yarn start

The backend server will now be running at http://localhost:5000 (or the port you specified).

**2. Frontend Setup**
Open a new terminal window or tab and navigate to the frontend directory:

cd ../exam-portal

Install the required packages:

npm install
# or
yarn install

Start the frontend development server:

npm run dev
# or
yarn dev

The frontend application will now be running and accessible at http://localhost:5173 (or a similar address that Vite provides).

**Usage**
Ensure both the backend and frontend servers are running.

Open your web browser and navigate to the address of your frontend application (e.g., http://localhost:5173).

You should see the login page for the exam portal. You can now test the application's functionality.

**Technologies Used**
**Backend**
Node.js: JavaScript runtime environment.

Express.js: Web application framework for Node.js.

MongoDB: NoSQL database for data storage.

Mongoose: MongoDB object modeling tool.

JWT: JSON Web Tokens for authentication.

bcrypt.js: Library for hashing passwords.

**Frontend**
React.js: JavaScript library for building user interfaces.

Vite: Frontend build tool.

React Router: For handling client-side routing.

CSS: For styling the application.

API Calls: Interacting with the backend API.
