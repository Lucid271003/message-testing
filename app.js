// app.js
const express = require('express');
const app = express();
app.use(express.json());

// Route handlers
app.use('/users', require('./routes/userRoutes'));
app.use('/messages', require('./routes/messageRoutes'));
app.use('/message-recipients', require('./routes/recipientRoutes'));

module.exports = app;