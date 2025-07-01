jest.setTimeout(15000);

// tests/message.test.js
const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../config/database");
const { User } = require("../models");

describe("Message API", () => {
  let sender, recipient;

  beforeAll(async () => {
    // Tạo người gửi và người nhận trước khi test
    sender = await User.create({
      email: `sender-${Date.now()}@example.com`,
      name: "Sender",
    });
    recipient = await User.create({
      email: `recipient-${Date.now()}@example.com`,
      name: "Recipient",
    });
  });

  it("should send a message to recipient", async () => {
    const res = await request(app)
      .post("/messages")
      .send({
        sender_id: sender.id,
        content: "Hello from Jest test",
        recipients: [recipient.id],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toHaveProperty("id");
    expect(res.body.message).toHaveProperty("content", "Hello from Jest test");
  });

  it("should show inbox messages for recipient", async () => {
    const res = await request(app).get(`/users/${recipient.id}/inbox-messages`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should show sent messages for sender", async () => {
    const res = await request(app).get(`/users/${sender.id}/sent-messages`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

afterAll(async () => {
  await sequelize.close();
});
