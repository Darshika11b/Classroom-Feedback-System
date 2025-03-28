import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';
import Notification from './components/notification';
import PropTypes from 'prop-types';

const socket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000');
const isSpeechRecognitionSupported = 'webkitSpeechRecognition' in window;

Notification.propTypes = {
    message: PropTypes.string,
    onClose: PropTypes.func,
    duration: PropTypes.number,
};

Notification.defaultProps = {
    message: '',
    onClose: () => {},
    duration: 3000,
};

function App() {
    const [feedback, setFeedback] = useState("");
    const [feedbackList, setFeedbackList] = useState([]);
    const [sentimentData, setSentimentData] = useState([]);
    const [recording, setRecording] = useState(false);
    const [notification, setNotification] = useState(''); // Notification state

    useEffect(() => {
        socket.on('receive-feedback', (data) => {
            setFeedbackList((prev) => [...prev, data]);
            updateSentimentData(data);
            handleNewFeedback('New feedback received!');
        });

        return () => {
            socket.off('receive-feedback'); // Remove event listener
            socket.disconnect(); // Disconnect socket
        };
    }, []);

    useEffect(() => {
        socket.on('connect_error', () => {
            handleNewFeedback('Connection to the server failed.');
        });

        return () => {
            socket.off('connect_error');
        };
    }, []);

    const sendFeedback = () => {
        if (feedback.trim()) {
            socket.emit('send-feedback', feedback);
            setFeedback("");
            handleNewFeedback('Feedback submitted successfully!');
        } else {
            handleNewFeedback('Feedback cannot be empty.', 2000);
        }
    };

    const updateSentimentData = (data) => {
        setSentimentData((prev) => [...prev, { name: data.message, sentiment: data.sentiment }]);
    };

    const startRecording = () => {
        setRecording(true);
        if (!window.webkitSpeechRecognition) {
            alert("Speech recognition is not supported in this browser.");
            setRecording(false);
            return;
        }
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = "en-US";
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setFeedback(transcript);
            setRecording(false);
        };
        recognition.onerror = () => setRecording(false);
        recognition.start();
    };

    const handleNewFeedback = (msg, duration = 3000) => {
        setNotification(msg);
        const timer = setTimeout(() => setNotification(''), duration);

        return () => clearTimeout(timer); // Cleanup timeout
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Notification message={notification} onClose={() => setNotification('')} />
            <h1 className="text-3xl font-bold mb-4">Classroom Feedback System</h1>
            <Card className="mb-4">
                <CardContent>
                    <textarea
                        className="w-full p-2 rounded border"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Enter your feedback..."
                    />
                    <Button className="mt-2" onClick={sendFeedback}>Submit Feedback</Button>
                    <Button
                        className={`mt-2 ml-2 ${recording ? 'bg-red-500' : 'bg-green-500'}`}
                        onClick={startRecording}
                        aria-label={recording ? 'Stop recording' : 'Start voice input'}
                    >
                        {recording ? <MicOff /> : <Mic />} {recording ? 'Recording...' : 'Voice Input'}
                    </Button>
                </CardContent>
            </Card>
            <h2 className="text-2xl font-semibold mb-2">Feedback History</h2>
            <div className="space-y-2">
                {feedbackList.map((item, index) => (
                    <motion.div key={index} className="p-2 bg-white rounded shadow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {item.message} - {item.sentiment}
                    </motion.div>
                ))}
            </div>
            <h2 className="text-2xl font-semibold mt-4">Sentiment Analysis</h2>
            <LineChart width={600} height={300} data={sentimentData.length ? sentimentData : [{ name: 'No Data', sentiment: 0 }]}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Tooltip />
                <Line type="monotone" dataKey="sentiment" stroke="#8884d8" />
            </LineChart>
        </div>
    );
}

export default App;

// Ensure the environment variable is set in a .env file