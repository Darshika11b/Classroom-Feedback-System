import React from 'react';
import PropTypes from 'prop-types';

function AdminDashboard({ sentimentData = [] }) {
    // Calculate counts
    const positiveCount = sentimentData.filter(item => item.sentiment === "Positive").length;
    const negativeCount = sentimentData.filter(item => item.sentiment === "Negative").length;
    const neutralCount = sentimentData.length - positiveCount - negativeCount;

    return (
        <div className="p-4 bg-white rounded shadow mt-4">
            <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
            <div className="space-y-2">
                <p>Total Feedback: <strong>{sentimentData.length}</strong></p>
                <p>Positive Feedback: <strong>{positiveCount}</strong></p>
                <p>Negative Feedback: <strong>{negativeCount}</strong></p>
                <p>Neutral Feedback: <strong>{neutralCount}</strong></p>
            </div>
        </div>
    );
}

// Prop validation
AdminDashboard.propTypes = {
    sentimentData: PropTypes.arrayOf(
        PropTypes.shape({
            sentiment: PropTypes.string.isRequired, // Ensure each item has a `sentiment` property
        })
    ),
};

export default AdminDashboard;
