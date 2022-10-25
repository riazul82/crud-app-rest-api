const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./routes/user.route');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the Rest API!');
});

// user routes
app.use('/users', userRouter);

// route error
app.use((req, res, next) => {
    res.status(404).json({message: 'route not found!'});
});

// server error
app.use((err, req, res, next) => {
    res.status(500).json({message: err.message});
});

module.exports = app;