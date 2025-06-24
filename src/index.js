require('dotenv').config();
const express = require('express');
const sequelize = require('../config/database');
require('../models'); 

const app = express();
app.use(express.json());

app.use('/users', require('../routes/userRoutes'));
app.use('/messages', require('../routes/messageRoutes'));
app.use('/message-recipients', require('../routes/recipientRoutes'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connected');
  } catch (err) {
    console.error('❌ DB error:', err.message);
  }
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
