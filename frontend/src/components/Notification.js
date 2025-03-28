import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const notification = ({ message, onClose, duration = 3000 }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                if (onClose && typeof onClose === 'function') {
                    onClose();
                }
            }, duration);

            return () => clearTimeout(timer); // Cleanup the timer on unmount
        }
    }, [message, onClose, duration]);

    if (!message) return null; // Do not render if there is no message

    return (
        <div className="fixed top-4 right-4 p-3 bg-green-500 text-white rounded shadow-md">
            {message}
            <button
                onClick={onClose}
                className="ml-4 text-sm underline"
                aria-label="Close notification"
            >
                Close
            </button>
        </div>
    );
};

Notification.propTypes = {
    message: PropTypes.string, // The notification message
    onClose: PropTypes.func, // Callback to close the notification
    duration: PropTypes.number, // Duration in milliseconds before auto-hide
};

Notification.defaultProps = {
    message: '',
    onClose: () => {}, // Default to a no-op function
    duration: 3000, // Default duration is 3 seconds
};

export default Notification;
