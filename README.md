# Task Manager App

A full-stack task manager web application built with Node.js, Express.js, MongoDB, EJS, and Tailwind CSS. Users can register, log in, and manage their personal tasks with real-time status updates. The app includes user authentication with JWT and cookies, and supports creating, reading, updating, deleting, and marking tasks as completed or pending.

Features include user registration and login, secure JWT-based authentication, CRUD operations for tasks, completion toggle, Tailwind CSS-powered responsive UI, flash messages for feedback, and MongoDB timestamps for task tracking.

Tech stack used in the project includes Node.js, Express.js, MongoDB, Mongoose for database interaction, EJS for templating, Tailwind CSS for design, JWT for authentication, and cookie-parser for managing user sessions.

Project folder structure:

task-manager-api/
├── models/ (User and Task schemas)
├── routes/ (App routes)
├── views/ (EJS templates)
├── public/ (CSS and static files)
├── app.js
├── package.json
├── .env (not committed)
├── .gitignore

To run the project locally:

1. Clone the repository:  
git clone https://github.com/ChiragSakaliya/task-manager-api.git  
cd task-manager-api

2. Install dependencies:  
npm install

3. Create a `.env` file in the root directory and add:  
MONGODB_URL=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret_key

4. Start the server:  
npm start  
Visit http://localhost:3000 in your browser

Author: Chirag Sakaliya  
GitHub: https://github.com/ChiragSakaliya/task-manager-api  
If you found this project helpful, give it a ⭐ on GitHub and feel free to share.
