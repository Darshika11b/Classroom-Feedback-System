/* Classroom Feedback System - Backend (Node.js, Express) */
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: process.env.CORS_ORIGIN || '*' } });

app.use(cors());
app.use(express.json());

// Validate environment variables
if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in the environment variables.');
    process.exit(1);
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process if the database connection fails
    });

// Feedback Schema and Model
const Feedback = require('./models/Feedback'); // Ensure this path is correct and the model is properly defined

// Sentiment Analysis (Basic Keyword-based)
function analyzeSentiment(data) {
    const positiveWords = ['great', 'good', 'excellent', 'amazing'];
    const negativeWords = ['bad', 'poor', 'boring', 'terrible'];
    const isPositive = positiveWords.some((word) => data.includes(word));
    const isNegative = negativeWords.some((word) => data.includes(word));
    return isPositive ? 'Positive' : isNegative ? 'Negative' : 'Neutral';
}

// Socket.IO Real-time Communication
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.join('feedback-room'); // Join the client to a specific room

    // Handle feedback event
    socket.on('feedback', async (data) => {
        if (typeof data !== 'string' || !data.trim()) {
            console.error('Invalid feedback data received');
            socket.emit('error-feedback', { message: 'Invalid feedback data' });
            return;
        }

        try {
            const sanitizedData = data.trim().replace(/[^a-zA-Z0-9\s.,!?]/g, ''); // Sanitize input
            const sentiment = analyzeSentiment(sanitizedData);

            // Save feedback to the database
            const feedback = new Feedback({ message: sanitizedData, sentiment });
            await feedback.save();

            // Broadcast feedback to all clients in the room
            io.to('feedback-room').emit('receive-feedback', { message: sanitizedData, sentiment });
        } catch (error) {
            console.error('Error saving feedback:', error);
            socket.emit('error-feedback', { message: 'Failed to save feedback', error: error.message });
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
