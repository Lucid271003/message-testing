const User = require('./User');
const Message = require('./Message');
const MessageRecipient = require('./MessageRecipient');

// Setup associations
User.hasMany(Message, { foreignKey: 'sender_id' });
Message.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });

Message.hasMany(MessageRecipient, { foreignKey: 'message_id' });
MessageRecipient.belongsTo(Message, { foreignKey: 'message_id' });

User.hasMany(MessageRecipient, { foreignKey: 'recipient_id' });
MessageRecipient.belongsTo(User, { foreignKey: 'recipient_id', as: 'recipient' });

module.exports = {
  User,
  Message,
  MessageRecipient,
};
