require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_PASS = encodeURIComponent(process.env.MONGO_PASS);
const MONGO_USER = encodeURIComponent(process.env.MONGO_USER);
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.8edjln8.mongodb.net/`;

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

 
app.use(morgan('dev')); // Middleware to log HTTP requests
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static(path.join(__dirname, 'client/build'))); // Middleware to serve static files

// Basic route for GET request
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
