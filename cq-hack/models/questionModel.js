const mongoose = require('mongoose');

// Define the schema for storing questions and answers
const questionSchema = new mongoose.Schema({
  questionKey: { type: String, required: true },
  question: { type: String, required: true },
  answerKey: { type: String, required: true },
  answer: { type: String }
});

// Export the model
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
