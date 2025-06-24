require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




const userSchema = new mongoose.Schema({
  username: { type: String, required: true }
});

const exerciseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true }
});

const User = mongoose.model('User', userSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);


app.post('/api/users', async (req, res) => {
  try {
    const user = new User({ username: req.body.username });
    const savedUser = await user.save();
    res.json({ username: savedUser.username, _id: savedUser._id.toString() });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});


app.get('/api/users', async (req, res) => {
  const users = await User.find({});
  res.json(users.map(u => ({ username: u.username, _id: u._id.toString() })));
});


app.post('/api/users/:_id/exercises', async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) return res.status(400).json({ error: 'User not found' });

    const { description, duration, date } = req.body;

    const exercise = new Exercise({
      userId: user._id.toString(),
      description,
      duration: Number(duration),
      date: date ? new Date(date) : new Date()
    });

    const saved = await exercise.save();

    res.json({
      _id: user._id.toString(),
      username: user.username,
      date: saved.date.toDateString(), 
      duration: saved.duration,
      description: saved.description,
      date: saved.date.toDateString()
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add exercise' });
  }
});


app.get('/api/users/:_id/logs', async (req, res) => {
  try {
    const { from, to, limit } = req.query;
    const user = await User.findById(req.params._id);
    if (!user) return res.status(400).json({ error: 'User not found' });

    let filter = { userId: user._id.toString() };
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
      _id: user._id.toString(),
      username: user.username,
      count: log.length,
      log
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve logs' });
  }
});

app.listen(PORT, () => {
  console.log(`⚔️ Server running at http://localhost:${PORT}`);
});
