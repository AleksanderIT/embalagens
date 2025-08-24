const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

/**
 * @swagger
 * /contact/send:
 *   post:
 *     summary: Enviar mensagem de contato
 *     tags: [Contato]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactForm'
 *     responses:
 *       200:
 *         description: Mensagem enviada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Mensagem enviada com sucesso"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Enviar mensagem de contato
router.post('/send', [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Nome deve ter entre 2 e 100 caracteres'),
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('phone').optional().trim().isLength({ min: 10 }).withMessage('Telefone deve ter pelo menos 10 dígitos'),
  body('subject').trim().isLength({ min: 5, max: 200 }).withMessage('Assunto deve ter entre 5 e 200 caracteres'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Mensagem deve ter entre 10 e 2000 caracteres')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, subject, message } = req.body;

    // Aqui você pode implementar o envio de email
    // Por exemplo, usando nodemailer ou um serviço como SendGrid
    
    // Por enquanto, apenas retornamos sucesso
    console.log('Nova mensagem de contato:', {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    res.json({
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      success: true
    });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * @swagger
 * /contact/info:
 *   get:
 *     summary: Obter informações de contato da empresa
 *     tags: [Contato]
 *     responses:
 *       200:
 *         description: Informações de contato
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 company:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                 address:
 *                   type: object
 *                   properties:
 *                     street:
 *                       type: string
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     zipCode:
 *                       type: string
 *                 contact:
 *                   type: object
 *                   properties:
 *                     phone:
 *                       type: string
 *                     email:
 *                       type: string
 *                     website:
 *                       type: string
 *                 social:
 *                   type: object
 *                   properties:
 *                     linkedin:
 *                       type: string
 *                     instagram:
 *                       type: string
 *                     facebook:
 *                       type: string
 *                 businessHours:
 *                   type: object
 *                   properties:
 *                     monday:
 *                       type: string
 *                     friday:
 *                       type: string
 *                     saturday:
 *                       type: string
 *                     sunday:
 *                       type: string
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Obter informações de contato da empresa
router.get('/info', (req, res) => {
  const contactInfo = {
    company: {
      name: 'ETMA Soluções',
      description: 'Especialistas em embalagens sustentáveis e inovadoras'
    },
    address: {
      street: 'Rua das Embalagens, 123',
      neighborhood: 'Centro Industrial',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'Brasil'
    },
    contact: {
      phone: '+55 (11) 1234-5678',
      whatsapp: '+55 (11) 98765-4321',
      email: 'contato@etmasolucoes.com.br',
      website: 'www.etmasolucoes.com.br'
    },
    social: {
      linkedin: 'https://linkedin.com/company/etma-solucoes',
      instagram: 'https://instagram.com/etmasolucoes',
      facebook: 'https://facebook.com/etmasolucoes'
    },
    businessHours: {
      monday: '08:00 - 18:00',
      tuesday: '08:00 - 18:00',
      wednesday: '08:00 - 18:00',
      thursday: '08:00 - 18:00',
      friday: '08:00 - 18:00',
      saturday: '08:00 - 12:00',
      sunday: 'Fechado'
    }
  };

  res.json(contactInfo);
});

module.exports = router;
