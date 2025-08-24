const request = require('supertest');
const app = require('../server');

describe('Contact Routes', () => {
  describe('POST /api/contact/send', () => {
    it('should send contact message with valid data', async () => {
      const messageData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+55 11 99999-9999',
        subject: 'Solicitação de Orçamento',
        message: 'Gostaria de solicitar um orçamento para embalagens plásticas.'
      };

      const response = await request(app)
        .post('/api/contact/send')
        .send(messageData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('success', true);
    });

    it('should validate required fields', async () => {
      const invalidMessage = {
        name: 'John Doe',
        email: 'john@example.com'
        // Missing required fields
      };

      const response = await request(app)
        .post('/api/contact/send')
        .send(invalidMessage);

      expect(response.status).toBe(400);
    });

    it('should validate email format', async () => {
      const invalidMessage = {
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Test Subject',
        message: 'Test message'
      };

      const response = await request(app)
        .post('/api/contact/send')
        .send(invalidMessage);

      expect(response.status).toBe(400);
    });

    it('should validate name length', async () => {
      const invalidMessage = {
        name: 'A', // Too short
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message'
      };

      const response = await request(app)
        .post('/api/contact/send')
        .send(invalidMessage);

      expect(response.status).toBe(400);
    });

    it('should validate message length', async () => {
      const invalidMessage = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Short' // Too short
      };

      const response = await request(app)
        .post('/api/contact/send')
        .send(invalidMessage);

      expect(response.status).toBe(400);
    });

    it('should accept optional phone field', async () => {
      const messageData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message without phone'
      };

      const response = await request(app)
        .post('/api/contact/send')
        .send(messageData);

      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/contact/info', () => {
    it('should return contact information', async () => {
      const response = await request(app)
        .get('/api/contact/info');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('company');
      expect(response.body).toHaveProperty('address');
      expect(response.body).toHaveProperty('contact');
      expect(response.body).toHaveProperty('social');
      expect(response.body).toHaveProperty('businessHours');

      // Validate company info
      expect(response.body.company).toHaveProperty('name');
      expect(response.body.company).toHaveProperty('description');

      // Validate address
      expect(response.body.address).toHaveProperty('street');
      expect(response.body.address).toHaveProperty('city');
      expect(response.body.address).toHaveProperty('state');

      // Validate contact
      expect(response.body.contact).toHaveProperty('phone');
      expect(response.body.contact).toHaveProperty('email');
      expect(response.body.contact).toHaveProperty('website');

      // Validate social
      expect(response.body.social).toHaveProperty('linkedin');
      expect(response.body.social).toHaveProperty('instagram');
      expect(response.body.social).toHaveProperty('facebook');

      // Validate business hours
      expect(response.body.businessHours).toHaveProperty('monday');
      expect(response.body.businessHours).toHaveProperty('friday');
      expect(response.body.businessHours).toHaveProperty('sunday');
    });
  });
});
