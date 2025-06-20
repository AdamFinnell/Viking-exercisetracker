require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI);


const userSchema = new mongoose.Schema({
  username: { type: String, required: true }
});

const exerciseSchema = new mongoose.Schema({
  userId: String,
  description: String,
  duration: Number,
  date: Date
});

const User = mongoose.model('User', userSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);


app.post('/api/users', async (req, res) => {
  const user = new User({ username: req.body.username });
  const saved = await user.save();
  res.json({ username: saved.username, _id: saved._id });
});


app.get('/api/users', async (req, res) => {
  const users = await User.find({});
  res.json(users.map(u => ({ username: u.username, _id: u._id })));
});


app.post('/api/users/:_id/exercises', async (req, res) => {
  const { description, duration, date } = req.body;
  const user = await User.findById(req.params._id);
  if (!user) return res.status(400).json({ error: 'User not found' });

  const exercise = new Exercise({
    userId: user._id,
    description,
    duration: Number(duration),
    date: date ? new Date(date) : new Date()
  });

  const saved = await exercise.save();

  res.json({
    _id: user._id,
    username: user.username,
    date: saved.date.toDateString(),
    duration: saved.duration,
    description: saved.description
  });
});
 
app.get('/api/users/:_id/logs', async (req, res) => {
  const { from, to, limit } = req.query;
  const user = await User.findById(req.params._id);
  if (!user) return res.status(400).json({ error: 'User not found' });

  let filter = { userId: user._id };
  let exercises = await Exercise.find(filter).sort({ date: 'asc' });

  if (from) {
    const fromDate = new Date(from);
    exercises = exercises.filter(e => e.date >= fromDate);
  }

  if (to) {
    const toDate = new Date(to);
    exercises = exercises.filter(e => e.date <= toDate);
  }

  if (limit) {
    exercises = exercises.slice(0, parseInt(limit));
  }

  const log = exercises.map(e => ({
    description: e.description,
    duration: e.duration,
    date: e.date.toDateString()
  }));

  res.json({
    _id: user._id,
    username: user.username,
    count: log.length,
    log
  });
});


app.listen(PORT, () => {
  console.log(`⚔️ Server running at http://localhost:${PORT}`);
});
