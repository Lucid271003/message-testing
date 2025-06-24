const { User, Message, MessageRecipient } = require('../models');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

exports.getInboxMessages = async (req, res) => {
  const userId = req.params.id;
  const { read } = req.query;

  const where = { recipient_id: userId };
  if (read === 'false') where.read = false;

  const inbox = await MessageRecipient.findAll({
    where,
    include: [
      { model: Message, include: [{ model: User, as: 'sender' }] }
    ]
  });

  res.json(inbox);
};

exports.getSentMessages = async (req, res) => {
  const userId = req.params.id;
  const sent = await Message.findAll({
    where: { sender_id: userId },
    include: [{ model: MessageRecipient }]
  });
  res.json(sent);
};
