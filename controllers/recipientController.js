const { MessageRecipient } = require('../models');

exports.markAsRead = async (req, res) => {
  try {
    const entry = await MessageRecipient.findByPk(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Recipient entry not found' });
    }

    entry.read = true;
    entry.read_at = new Date();
    await entry.save();

    res.status(200).json(entry);
  } catch (err) {
    console.error('markAsRead error:', err);
    res.status(500).json({ error: err.message });
  }
};
