const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  answers: {
    type: [{
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
      },
      selectedOption: String,
      correctOption: String,
    }],
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Submission', submissionSchema);
