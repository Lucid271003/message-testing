const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error('Missing DATABASE_URL in environment variables');
}

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
module.exports.sequelize = sequelize;
