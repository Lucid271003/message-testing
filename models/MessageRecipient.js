const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MessageRecipient = sequelize.define('MessageRecipient', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  message_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  recipient_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  read_at: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'message_recipients',
  timestamps: false,
});

module.exports = MessageRecipient;
