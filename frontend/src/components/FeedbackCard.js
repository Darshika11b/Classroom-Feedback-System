import React from 'react';
import PropTypes from 'prop-types';

function FeedbackCard({ message, sentiment, timestamp }) {
    // Format the timestamp
    const formattedTimestamp = new Date(timestamp).toLocaleString();

    // Determine sentiment color
    const sentimentColor = {
        Positive: 'text-green-500',
        Negative: 'text-red-500',
        Neutral: 'text-gray-500',
    }[sentiment] || 'text-gray-500'; // Default to gray if sentiment is undefined

    return (
        <div className="p-4 bg-white rounded shadow-md border border-gray-200">
            <p className="text-lg font-medium">{message}</p>
            <div className="flex justify-between items-center mt-2">
                <span className={`font-semibold ${sentimentColor}`}>{sentiment}</span>
                <span className="text-sm text-gray-400">{formattedTimestamp}</span>
            </div>
        </div>
    );
}

// Prop validation
FeedbackCard.propTypes = {
    message: PropTypes.string.isRequired, // Feedback message
    sentiment: PropTypes.oneOf(['Positive', 'Negative', 'Neutral']).isRequired, // Sentiment type
    timestamp: PropTypes.string.isRequired, // Timestamp of the feedback
};

export default FeedbackCard;