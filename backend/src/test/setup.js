const mongoose = require('mongoose');

// Configuração global para testes
beforeAll(async () => {
  // Conectar ao banco de teste
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://root:root123@localhost:27017/etma?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Desconectar do banco
  await mongoose.connection.close();
});

afterEach(async () => {
  // Limpar todas as coleções após cada teste
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
});

// Mock do console.log para evitar spam nos testes
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
