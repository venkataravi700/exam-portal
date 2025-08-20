const express = require('express');
const Question = require('../models/Question');
const Submission = require('../models/Submission');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Sample questions to seed the database
const sampleQuestions = [
  {
    questionText: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris"
  },
  {
    questionText: "Which is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter"
  },
  {
    questionText: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
    correctAnswer: "Harper Lee"
  },
  {
    questionText: "What is the primary language of the web?",
    options: ["Python", "Java", "JavaScript", "C++"],
    correctAnswer: "JavaScript"
  },
  {
    questionText: "Which of the following is not a React hook?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correctAnswer: "useReducer"
  }
];

// Middleware to seed database with questions
const seedQuestions = async (req, res, next) => {
  try {
    const count = await Question.countDocuments();
    if (count === 0) {
      await Question.insertMany(sampleQuestions);
      console.log('Database seeded with sample questions.');
    }
    next();
  } catch (err) {
    console.error('Error seeding database:', err.message);
    next(err);
  }
};

// @route   GET /api/exam/questions
// @desc    Get randomized questions
// @access  Private (requires authentication)
router.get('/questions', authMiddleware, seedQuestions, async (req, res) => {
  try {
    const questions = await Question.aggregate([
      { $sample: { size: 5 } } // Gets 5 random questions
    ]);
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/exam/submit
// @desc    Submit exam and store results
// @access  Private (requires authentication)
router.post('/submit', authMiddleware, async (req, res) => {
  const { answers } = req.body; // 'answers' is an object mapping questionId to selectedOption
  const userId = req.user.id;

  try {
    // Fetch all questions to verify answers and calculate score on the backend
    const questionIds = Object.keys(answers);
    const questions = await Question.find({ '_id': { $in: questionIds } });
    
    let score = 0;
    const submittedAnswers = [];

    questions.forEach(q => {
      const selectedOption = answers[q._id];
      submittedAnswers.push({
        questionId: q._id,
        selectedOption: selectedOption,
        correctOption: q.correctAnswer
      });
      if (selectedOption === q.correctAnswer) {
        score++;
      }
    });

    // Save the submission to the database
    const newSubmission = new Submission({
      userId,
      score,
      answers: submittedAnswers,
      submittedAt: new Date()
    });
    await newSubmission.save();

    res.json({ message: 'Exam submitted successfully', score });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
