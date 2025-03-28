import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Rating = ({ onRate }) => {
    const [rating, setRating] = useState(0);

    const handleRating = (value) => {
        setRating(value);
        if (onRate && typeof onRate === 'function') {
            onRate(value);
        }
    };

    return (
        <div className="flex gap-1" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => handleRating(star)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') handleRating(star);
                    }}
                    role="radio"
                    aria-checked={star === rating}
                    tabIndex={0}
                    className={`cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

Rating.propTypes = {
    onRate: PropTypes.func, // Ensures onRate is a function
};

Rating.defaultProps = {
    onRate: () => {}, // Default to a no-op function
};

export default Rating;
