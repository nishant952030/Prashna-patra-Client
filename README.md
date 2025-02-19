# Prashn Patra - AI-Powered Test Generator

## Description
Prashn Patra is an AI-powered test generator platform that allows users to create, manage, and attempt tests with an intuitive UI. It supports multiple question formats and enables real-time performance tracking.

## Features
- Create subjects and tests dynamically
- Auto-generate questions based on test details
- Supports MCQs, True/False, and Short Answer questions
- Implements negative marking
- Tracks scores and attempted tests
- Fully responsive and user-friendly UI

---

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **AI Model**: DeepSeek integration for question generation

---

## Installation & Setup
### 1. Clone the Repository
```sh
 git clone https://github.com/yourusername/prashn-patra.git
 cd prashn-patra
```

### 2. Install Dependencies
#### Backend
```sh
 cd backend
 npm install
```
#### Frontend
```sh
 cd frontend
 npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in both **frontend** and **backend** directories.

#### **Backend `.env`**
```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TEST_URL=http://localhost:8000/test
```

#### **Frontend `.env`**
```
REACT_APP_TEST_URL=http://localhost:8000/test
```

### 4. Run the Project
#### Start Backend Server
```sh
 cd backend
 npm start
```
#### Start Frontend
```sh
 cd frontend
 npm start
```

---

## API Endpoints
### **Test Routes**
- `POST /test/createTest` - Create a new test
- `DELETE /test/deleteTest/:testId` - Delete a test and its questions
- `GET /test/getTests` - Fetch all tests

### **Question Routes**
- `POST /questions/addQuestions` - Add questions to a test
- `GET /questions/getQuestions/:testId` - Fetch questions for a test

---

## Deployment
### **Backend Deployment (Vercel / Render / AWS / DigitalOcean)**
1. Push your backend code to GitHub
2. Deploy it on Render / Vercel / DigitalOcean with `MONGO_URI` configured in environment settings

### **Frontend Deployment (Vercel / Netlify)**
1. Push your frontend code to GitHub
2. Deploy it on Vercel or Netlify with `REACT_APP_TEST_URL` set to the deployed backend URL

---

## Contributors
- **Nishant Sharma** - [GitHub](https://github.com/nishant952030)

---

## License
This project is NOT open-source.

