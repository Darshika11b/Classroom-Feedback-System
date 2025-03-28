# Classroom Feedback System

## 📚 Project Overview
The Classroom Feedback System is an interactive platform that enables students to provide real-time feedback on lectures, teaching methods, and classroom environments. Built with a modern tech stack, it features real-time feedback submission, sentiment analysis, anonymous mode, notifications, and role-based access control, making it an ideal tool for classroom feedback management.

## 🚀 Features
- Real-time feedback submission
- Anonymous feedback mode
- Star rating system (1-5 stars)
- Emotion detection (Positive, Negative, Neutral)
- Real-time notifications for new feedback
- Role-based access control (Admin and Student roles)
- Sentiment analysis graph visualization
- Feedback tagging based on keywords
- JWT-based authentication and authorization

## 🛠️ Tech Stack
### Frontend
- React
- Tailwind CSS
- Recharts (for graph visualization)
- Axios (for API calls)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (for authentication)
- bcrypt (for password hashing)
- Socket.io (for real-time notifications)

## 🗃️ Project Structure
```
project/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── index.js
└── package.json
```

## 🔧 Installation
### Prerequisites
- Node.js
- MongoDB
- npm

### Step 1: Clone the Repository
```
git clone https://github.com/yourusername/classroom-feedback-system.git
cd classroom-feedback-system
```

### Step 2: Install Dependencies
#### Backend
```
cd backend
npm install
```
#### Frontend
```
cd frontend
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the `backend` folder:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/feedbackDB
JWT_SECRET=your_jwt_secret
```

### Step 4: Start MongoDB Server
```
mongod
```

### Step 5: Run the Application
#### Backend
```
cd backend
npm start
```
#### Frontend
```
cd frontend
npm start
```

## 🌐 How to Use
1. Register as a user and log in.
2. Provide feedback in real time using the feedback form.
3. Use the anonymous mode for hidden identity feedback.
4. View sentiment analysis and feedback tags on the dashboard.
5. Admins can manage and view feedback from the admin panel.


## 📝 License
This project is licensed under the MIT Lisence

