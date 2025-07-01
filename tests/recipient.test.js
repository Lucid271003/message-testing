jest.setTimeout(15000);

// tests/recipient.test.js
const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../config/database');
const { User, Message, MessageRecipient } = require('../models');

describe('Message Recipient API', () => {
  let sender, recipient, messageRecipientEntry;

  beforeAll(async () => {
    sender = await User.create({
      email: `sender-${Date.now()}@example.com`,
      name: 'Sender'
    });

    recipient = await User.create({
      email: `recipient-${Date.now()}@example.com`,
      name: 'Recipient'
    });

    const message = await Message.create({
      sender_id: sender.id,
      content: 'Mark read test'
    });

    messageRecipientEntry = await MessageRecipient.create({
      message_id: message.id,
      recipient_id: recipient.id
    });
  });

  it('should mark a message as read', async () => {
    const res = await request(app)
      .patch(`/message-recipients/${messageRecipientEntry.id}/mark-read`)
      .send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('read', true);
    expect(res.body).toHaveProperty('read_at');
  });
});

afterAll(async () => {
  await sequelize.close();
});
