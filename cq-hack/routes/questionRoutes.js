const express = require('express');
const router = express.Router();
const Question = require('../models/questionModel'); // Import the model
const { runPuppeteer } = require('../puppeteerLogic'); // Import Puppeteer logic

// Middleware to log request body for debugging
router.use((req, res, next) => {
  console.log('Request Body:', req.body);
  next();
});

// POST endpoint to submit a question
router.post('/:key', async (req, res) => {
  const { key } = req.params; // Dynamic key like "Question_1"
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    const questionKey = `question_${key.split('_')[1]}`;
    const answerKey = `answer_${key.split('_')[1]}`;

    // Run Puppeteer to get the answer
    const scrapedAnswer = await runPuppeteer(question);

    // Save the question and answer in the database
    const newQuestion = new Question({
      questionKey,
      question,
      answerKey,
      answer: scrapedAnswer.join('\n')
    });
    await newQuestion.save();

    res.json({ message: 'Question submitted and answer generated', questionKey, answerKey });
  } catch (error) {
    console.error('Error in POST request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET endpoint to fetch an answer
router.get('/answer_:number', async (req, res) => {
  const { number } = req.params;
  const answerKey = `answer_${number}`;

  try {
    const record = await Question.findOne({ answerKey });
    if (record) {
      res.json({ answer: record.answer });
    } else {
      res.status(404).json({ error: 'Answer not found' });
    }
  } catch (error) {
    console.error('Error in GET request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

