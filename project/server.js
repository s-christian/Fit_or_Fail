require('dotenv').config({ path: './config/.env' });
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const app = express();

// Used to parse the body (replaces the body-parser package)
app.use(express.json());

// DB config
const db = process.env.DB_URI;

// Connect to Mongo
mongoose
    .connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })  // extra options used to eliminate deprecation warnings
    .then(() => console.log('MongoDB Connected...'))  // .then and .catch exist because mongoose.connect() is "promise-based"
    .catch(err => console.log(err));

// Use routes
app.use('/api/login', require('./routes/api/login'));
app.use('/api/register', require('./routes/api/register'));

// Server static assets if in production'
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
};


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
