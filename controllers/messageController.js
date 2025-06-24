const { Message, MessageRecipient } = require('../models');

exports.sendMessage = async (req, res) => {
  try {
    const { sender_id, subject, content, recipients } = req.body;
    const message = await Message.create({ sender_id, subject, content });
    const records = recipients.map(rid => ({
      message_id: message.id,
      recipient_id: rid,
    }));
    await MessageRecipient.bulkCreate(records);
    res.status(201).json({ message, recipients: records });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMessageById = async (req, res) => {
  const message = await Message.findByPk(req.params.id, {
    include: [
      { model: MessageRecipient, include: ['recipient'] },
      { model: require('../models/User'), as: 'sender' }
    ]
  });
  if (!message) return res.status(404).json({ error: 'Message not found' });
  res.json(message);
};
