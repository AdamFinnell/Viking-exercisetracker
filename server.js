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