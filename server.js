const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser');
const User = require('./models/User.js');
const Exercise = require('./models/Exercise.js');

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(console.log("Connected"))
.catch(err => console.error(err));


const addUsers = async (username) =>{  
  try{
    const user = await User.create({username});
    return user;
  }
  catch(err){
    console.error(err);
    return null;
  }
}
const checkValidDate = (date) => !isNaN(Date.parse(date));


const addExercise = async (id,description,duration,date) =>{
  try{
    
    const user = await User.findById(id);
    if(!user){
      return null;
    }
    
    let newDate;
    if(!date || !checkValidDate(date)){
      newDate = new Date();
    }
    else{
      newDate = new Date(date);
    }
   
    const exercise = await Exercise.create({
      userId: user._id,
      date: newDate,
      duration: Number(duration),
      description: description
    });
    
    return exercise;
  }
  catch(err){
    console.error(err);
    return null;
  }
}



app.post('/api/users', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username is required' });

    const newUser = new User({ username });
    await newUser.save();

    res.json({
      username: newUser.username,
      _id: newUser._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, '_id username');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/users/:_id/exercises', async (req, res) => {
  try {
    const { _id } = req.params;
    const { description, duration, date } = req.body;

    if (!description || !duration) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const user = await User.findById(_id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const exercise = new Exercise({
      userId: _id,
      description,
      duration: parseInt(duration),
      date: date ? new Date(date) : new Date()
    });

    await exercise.save();

    res.json({
      _id: user._id,
      username: user.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/users/:_id/logs', async (req, res) => {
  try {
    const { _id } = req.params;
    const { from, to, limit } = req.query;

    const user = await User.findById(_id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const query = { userId: _id };
    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to);
    }

    let exercisesQuery = Exercise.find(query).select('description duration date');
    if (limit) exercisesQuery = exercisesQuery.limit(parseInt(limit));

    const exercises = await exercisesQuery.exec();

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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('🚀 App is running on port ' + listener.address().port);
});



