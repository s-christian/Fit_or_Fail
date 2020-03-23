const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 10
    }
});

module.exports = Question = mongoose.model('Question', QuestionSchema);
