// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const subjectsRouter = require('./routes/subjects');

const app = express();
app.use(cors(
  {
    origin: "*",
    credentials: true,
  }
));
app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/student-attendance';
mongoose.connect(mongoUri);

// Mount subjects routes
app.use('/subjects', subjectsRouter);
app.get ('/ping', (req, res) => {
  res.status(200).json("PING PONG");
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running - on port ${PORT}`);
});
