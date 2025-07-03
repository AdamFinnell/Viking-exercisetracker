// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(express.static("public"));

// const User = require("./models/User");

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Landing page (optional)
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/index.html");
// });

// // Create new user
// app.post("/api/users", async (req, res) => {
//   const newUser = new User({ username: req.body.username });
//   await newUser.save();
//   res.json({ username: newUser.username, _id: newUser._id });
// });

// // Get all users
// app.get("/api/users", async (req, res) => {
//   const users = await User.find({}, "username _id");
//   res.json(users);
// });

// // Add exercise
// app.post("/api/users/:_id/exercises", async (req, res) => {
//   const { description, duration, date } = req.body;
//   const user = await User.findById(req.params._id);
//   if (!user) return res.status(404).send("User not found");

//   const exerciseDate = date ? new Date(date) : new Date();

//   const exercise = {
//     description,
//     duration: parseInt(duration),
//     date: exerciseDate.toDateString(),
//   };

//   user.log.push(exercise);
//   await user.save();

//   res.json({
//     _id: user._id,
//     username: user.username,
//     date: exercise.date,
//     duration: exercise.duration,
//     description: exercise.description,
//   });
// });

// // Get logs
// app.get("/api/users/:_id/logs", async (req, res) => {
//   const { from, to, limit } = req.query;
//   const user = await User.findById(req.params._id);
//   if (!user) return res.status(404).send("User not found");

//   let logs = [...user.log];

//   if (from) {
//     const fromDate = new Date(from);
//     logs = logs.filter((e) => new Date(e.date) >= fromDate);
//   }

//   if (to) {
//     const toDate = new Date(to);
//     logs = logs.filter((e) => new Date(e.date) <= toDate);
//   }

//   if (limit) {
//     logs = logs.slice(0, parseInt(limit));
//   }

//   res.json({
//     _id: user._id,
//     username: user.username,
//     count: logs.length,
//     log: logs,
//   });
// });

// // Start server
// const listener = app.listen(process.env.PORT || 3000, () => {
//   console.log("App is running on port " + listener.address().port);
// });


// const exerciseForm = document.getElementById('exercise-form');exerciseForm.addEventListener('submit', () => {const userId = document.getElementById('uid').value;exerciseForm.action = `/api/users/${userId}/exercises`;exerciseForm.submit();});







 // In-memory storage for the demo
      
 
 
 
 
 
 // let users = [];
        // let exercises = [];
        // let nextUserId = 1;
        // let nextExerciseId = 1;

        // // Initialize the app
        // document.addEventListener('DOMContentLoaded', function() {
        //     loadInitialData();
        //     updateStats();
        //     setupEventListeners();
        // });

        // function loadInitialData() {
        //     // Add some sample data
        //     const sampleUsers = [
        //         { username: 'john_doe', _id: generateId() },
        //         { username: 'jane_smith', _id: generateId() }
        //     ];
            
        //     users = sampleUsers;
            
        //     const sampleExercises = [
        //         {
        //             _id: generateId(),
        //             userId: users[0]._id,
        //             description: 'Morning run',
        //             duration: 30,
        //             date: new Date('2024-01-15').toDateString()
        //         },
        //         {
        //             _id: generateId(),
        //             userId: users[0]._id,
        //             description: 'Weight training',
        //             duration: 45,
        //             date: new Date('2024-01-16').toDateString()
        //         },
        //         {
        //             _id: generateId(),
        //             userId: users[1]._id,
        //             description: 'Yoga session',
        //             duration: 60,
        //             date: new Date('2024-01-17').toDateString()
        //         }
        //     ];
            
        //     exercises = sampleExercises;
            
        //     updateUsersList();
        //     updateUserSelects();
        //     updateStats();
        // }

        // function generateId() {
        //     return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
        // }

        // function setupEventListeners() {
        //     document.getElementById('userForm').addEventListener('submit', handleCreateUser);
        //     document.getElementById('exerciseForm').addEventListener('submit', handleAddExercise);
        //     document.getElementById('logUserSelect').addEventListener('change', fetchLog);
        // }

        // function handleCreateUser(e) {
        //     e.preventDefault();
        //     const formData = new FormData(e.target);
        //     const username = formData.get('username');
            
        //     if (!username || username.trim() === '') {
        //         showMessage('Username is required', 'error');
        //         return;
        //     }

        //     // Check if username already exists
        //     if (users.find(user => user.username === username)) {
        //         showMessage('Username already exists', 'error');
        //         return;
        //     }

        //     const newUser = {
        //         username: username.trim(),
        //         _id: generateId()
        //     };

        //     users.push(newUser);
        //     updateUsersList();
        //     updateUserSelects();
        //     updateStats();
            
        //     showMessage(`User "${username}" created successfully!`, 'success');
        //     e.target.reset();
        // }

        // function handleAddExercise(e) {
        //     e.preventDefault();
        //     const formData = new FormData(e.target);
        //     const userId = formData.get('userId');
        //     const description = formData.get('description');
        //     const duration = parseInt(formData.get('duration'));
        //     const dateInput = formData.get('date');

        //     if (!userId || !description || !duration) {
        //         showMessage('All required fields must be filled', 'error');
        //         return;
        //     }

        //     const user = users.find(u => u._id === userId);
        //     if (!user) {
        //         showMessage('User not found', 'error');
        //         return;
        //     }

        //     const exerciseDate = dateInput ? new Date(dateInput) : new Date();
            
        //     const newExercise = {
        //         _id: generateId(),
        //         userId: userId,
        //         description: description.trim(),
        //         duration: duration,
        //         date: exerciseDate.toDateString()
        //     };

        //     exercises.push(newExercise);
        //     updateStats();
            
        //     // Return the response in the expected format
        //     const response = {
        //         username: user.username,
        //         description: newExercise.description,
        //         duration: newExercise.duration,
        //         date: newExercise.date,
        //         _id: user._id
        //     };

        //     showMessage(`Exercise added successfully for ${user.username}!`, 'success');
        //     console.log('Exercise added:', response);
        //     e.target.reset();
        // }

        // function updateUsersList() {
        //     const usersList = document.getElementById('usersList');
            
        //     if (users.length === 0) {
        //         usersList.innerHTML = '<p class="loading">No users found. Create a user to get started.</p>';
        //         return;
        //     }

        //     usersList.innerHTML = users.map(user => `
        //         <div class="user-item">
        //             <div class="user-info">
        //                 <div class="user-name">${user.username}</div>
        //                 <div class="user-id">ID: ${user._id}</div>
        //             </div>
        //             <div class="user-actions">
        //                 <button class="btn-small" onclick="selectUserForExercise('${user._id}')">Add Exercise</button>
        //                 <button class="btn-small" onclick="selectUserForLog('${user._id}')">View Log</button>
        //             </div>
        //         </div>
        //     `).join('');
        // }

        // function updateUserSelects() {
        //     const userSelect = document.getElementById('userSelect');
        //     const logUserSelect = document.getElementById('logUserSelect');
            
        //     const options = users.map(user => 
        //         `<option value="${user._id}">${user.username}</option>`
        //     ).join('');

        //     userSelect.innerHTML = '<option value="">Select a user...</option>' + options;
        //     logUserSelect.innerHTML = '<option value="">Select a user...</option>' + options;
        // }

        // function selectUserForExercise(userId) {
        //     document.getElementById('userSelect').value = userId;
        //     document.getElementById('description').focus();
        // }

        // function selectUserForLog(userId) {
        //     document.getElementById('logUserSelect').value = userId;
        //     fetchLog();
        // }

        // function fetchLog() {
        //     const userId = document.getElementById('logUserSelect').value;
        //     const fromDate = document.getElementById('fromDate').value;
        //     const toDate = document.getElementById('toDate').value;
        //     const limit = parseInt(document.getElementById('limit').value) || null;
            
        //     const logResults = document.getElementById('logResults');
            
        //     if (!userId) {
        //         logResults.innerHTML = '<p class="loading">Please select a user to view their exercise log.</p>';
        //         return;
        //     }

        //     const user = users.find(u => u._id === userId);
        //     if (!user) {
        //         logResults.innerHTML = '<p class="loading">User not found.</p>';
        //         return;
        //     }

        //     let userExercises = exercises.filter(ex => ex.userId === userId);
            
        //     // Apply date filters
        //     if (fromDate) {
        //         const fromDateObj = new Date(fromDate);
        //         userExercises = userExercises.filter(ex => new Date(ex.date) >= fromDateObj);
        //     }
            
        //     if (toDate) {
        //         const toDateObj = new Date(toDate);
        //         userExercises = userExercises.filter(ex => new Date(ex.date) <= toDateObj);
        //     }
            
        //     // Apply limit
        //     if (limit && limit > 0) {
        //         userExercises = userExercises.slice(0, limit);
        //     }

        //     // Sort by date (newest first)
        //     userExercises.sort((a, b) => new Date(b.date) - new Date(a.date));

        //     const logResponse = {
        //         username: user.username,
        //         count: userExercises.length,
        //         _id: user._id,
        //         log: userExercises.map(ex => ({
        //             description: ex.description,
        //             duration: ex.duration,
        //             date: ex.date
        //         }))
        //     };

        //     console.log('Log response:', logResponse);

        //     if (userExercises.length === 0) {
        //         logResults.innerHTML = `
        //             <div class="exercise-log">
        //                 <h3>${user.username}'s Exercise Log</h3>
        //                 <p class="loading">No exercises found for the selected criteria.</p>
        //             </div>
        //         `;
        //         return;
        //     }

        //     logResults.innerHTML = `
        //         <div class="exercise-log">
        //             <h3>${user.username}'s Exercise Log</h3>
        //             <p><strong>Total exercises:</strong> ${userExercises.length}</p>
        //             <div class="exercises">
        //                 ${userExercises.map(exercise => `
        //                     <div class="exercise-item">
        //                         <div class="exercise-description">${exercise.description}</div>
        //                         <div class="exercise-details">
        //                             <span><strong>Duration:</strong> ${exercise.duration} minutes</span>
        //                             <span><strong>Date:</strong> ${exercise.date}</span>
        //                         </div>
        //                     </div>
        //                 `).join('')}
        //             </div>
        //         </div>
        //     `;
        // }

        // function updateStats() {
        //     const totalUsers = users.length;
        //     const totalExercises = exercises.length;
            
        //     document.getElementById('totalUsers').textContent = totalUsers;
        //     document.getElementById('totalExercises').textContent = totalExercises;
        // }

        // function showMessage(message, type) {
        //     const statusDiv = document.getElementById('statusMessage');
        //     statusDiv.innerHTML = `<div class="status-message status-${type}">${message}</div>`;
            
        //     setTimeout(() => {
        //         statusDiv.innerHTML = '';
        //     }, 3000);
        // }

        // // API endpoints simulation for testing
        // window.api = {
        //     // POST /api/users
        //     createUser: function(username) {
        //         if (!username || username.trim() === '') {
        //             return { error: 'Username is required' };
        //         }
                
        //         if (users.find(user => user.username === username)) {
        //             return { error: 'Username already exists' };
        //         }
                
        //         const newUser = {
        //             username: username.trim(),
        //             _id: generateId()
        //         };
                
        //         users.push(newUser);
        //         updateUsersList();
        //         updateUserSelects();
        //         updateStats();
                
        //         return newUser;
        //     },

        //     // GET /api/users
        //     getUsers: function() {
        //         return users.map(user => ({
        //             username: user.username,
        //             _id: user._id
        //         }));
        //     },

        //     // POST /api/users/:_id/exercises
        //     addExercise: function(userId, description, duration, date) {
        //         const user = users.find(u => u._id === userId);
        //         if (!user) {
        //             return { error: 'User not found' };
        //         }

        //         const exerciseDate = date ? new Date(date) : new Date();
                
        //         const newExercise = {
        //             _id: generateId(),
        //             userId: userId,
        //             description: description.trim(),
        //             duration: parseInt(duration),
        //             date: exerciseDate.toDateString()
        //         };

        //         exercises.push(newExercise);
        //         updateStats();
                
        //         return {
        //             username: user.username,
        //             description: newExercise.description,
        //             duration: newExercise.duration,
        //             date: newExercise.date,
        //             _id: user._id
        //         };
        //     },

        //     // GET /api/users/:_id/logs
        //     getUserLogs: function(userId, from, to, limit) {
        //         const user = users.find(u => u._id === userId);
        //         if (!user) {
        //             return { error: 'User not found' };
        //         }

        //         let userExercises = exercises.filter(ex => ex.userId === userId);
                
        //         // Apply date filters
        //         if (from) {
        //             const fromDateObj = new Date(from);
        //             userExercises = userExercises.filter(ex => new Date(ex.date) >= fromDateObj);
        //         }
                
        //         if (to) {
        //             const toDateObj = new Date(to);
        //             userExercises = userExercises.filter(ex => new Date(ex.date) <= toDateObj);
        //         }
                
        //         // Apply limit
        //         if (limit && limit > 0) {
        //             userExercises = userExercises.slice(0, parseInt(limit));
        //         }

        //         return {
        //             username: user.username,
        //             count: userExercises.length,
        //             _id: user._id,
        //             log: userExercises.map(ex => ({
        //                 description: ex.description,
        //                 duration: ex.duration,
        //                 date: ex.date
        //             }))
        //         };
        //     }
        // };

        // // Expose API for testing
        // console.log('Exercise Tracker API is available at window.api');
        // console.log('Available methods:');
        // console.log('- window.api.createUser(username)');
        // console.log('- window.api.getUsers()');
        // console.log('- window.api.addExercise(userId, description, duration, date)');
        // console.log('- window.api.getUserLogs(userId, from, to, limit)');


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/exercise-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', userSchema);

// Exercise Schema
const exerciseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

// Root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// POST /api/users - Create new user
app.post('/api/users', async (req, res) => {
  try {
    const { username } = req.body;
    
    if (!username) {
      return res.json({ error: 'Username is required' });
    }

    const newUser = new User({ username });
    const savedUser = await newUser.save();
    
    res.json({
      username: savedUser.username,
      _id: savedUser._id
    });
  } catch (error) {
    if (error.code === 11000) {
      res.json({ error: 'Username already exists' });
    } else {
      res.json({ error: 'Error creating user' });
    }
  }
});

// GET /api/users - Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username _id');
    res.json(users);
  } catch (error) {
    res.json({ error: 'Error fetching users' });
  }
});

// POST /api/users/:_id/exercises - Add exercise
app.post('/api/users/:_id/exercises', async (req, res) => {
  try {
    const { _id } = req.params;
    const { description, duration, date } = req.body;

    // Validate user exists
    const user = await User.findById(_id);
    if (!user) {
      return res.json({ error: 'User not found' });
    }

    // Validate required fields
    if (!description || !duration) {
      return res.json({ error: 'Description and duration are required' });
    }

    // Handle date - use provided date or current date
    let exerciseDate = date ? new Date(date) : new Date();
    
    // Validate date
    if (date && isNaN(exerciseDate.getTime())) {
      return res.json({ error: 'Invalid date format' });
    }

    const newExercise = new Exercise({
      userId: _id,
      description,
      duration: parseInt(duration),
      date: exerciseDate
    });

    const savedExercise = await newExercise.save();

    res.json({
      username: user.username,
      description: savedExercise.description,
      duration: savedExercise.duration,
      date: savedExercise.date.toDateString(),
      _id: user._id
    });
  } catch (error) {
    res.json({ error: 'Error adding exercise' });
  }
});

// GET /api/users/:_id/logs - Get user's exercise log
app.get('/api/users/:_id/logs', async (req, res) => {
  try {
    const { _id } = req.params;
    const { from, to, limit } = req.query;

    // Validate user exists
    const user = await User.findById(_id);
    if (!user) {
      return res.json({ error: 'User not found' });
    }

    // Build query for exercises
    let query = { userId: _id };
    
    // Add date filters if provided
    if (from || to) {
      query.date = {};
      if (from) {
        query.date.$gte = new Date(from);
      }
      if (to) {
        query.date.$lte = new Date(to);
      }
    }

    // Get exercises with optional limit
    let exerciseQuery = Exercise.find(query).sort({ date: -1 });
    
    if (limit) {
      exerciseQuery = exerciseQuery.limit(parseInt(limit));
    }

    const exercises = await exerciseQuery;

    // Format response
    const log = exercises.map(exercise => ({
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString()
    }));

    res.json({
      username: user.username,
      count: exercises.length,
      _id: user._id,
      log
    });
  } catch (error) {
    res.json({ error: 'Error fetching exercise log' });
  }
});

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;