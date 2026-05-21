const mongoose = require('mongoose');

const dreamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A dream must have a title'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'A dream must have content']
  },
  tags: [String],
  mood: {
    type: String,
    enum: ['Peaceful', 'Anxious', 'Exciting', 'Terrifying', 'Confusing', 'Sad', 'Insightful'],
    default: 'Peaceful'
  },
  symbols: [String],
  lucidityScore: {
    type: Number,
    min: 1,
    max: 10,
    default: 1
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  lunarPhase: {
    type: String,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A dream must belong to a user']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Dream = mongoose.model('Dream', dreamSchema);

module.exports = Dream;
