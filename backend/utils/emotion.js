const analyzeEmotion = (message) => {
    const positiveWords = ["good", "great", "excellent", "amazing", "happy"];
    const negativeWords = ["bad", "poor", "terrible", "sad", "angry"];

    const wordRegex = (word) => new RegExp(`\\b${word}\\b`, 'i'); // Match whole words, case-insensitive

    const positiveMatches = positiveWords.filter(word => wordRegex(word).test(message));
    const negativeMatches = negativeWords.filter(word => wordRegex(word).test(message));

    if (positiveMatches.length > negativeMatches.length) return "Positive";
    if (negativeMatches.length > positiveMatches.length) return "Negative";
    return "Neutral";
};

module.exports = analyzeEmotion;
