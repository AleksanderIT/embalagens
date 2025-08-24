const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome do produto é obrigatório'],
    trim: true,
    maxlength: [100, 'Nome não pode ter mais de 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'Descrição do produto é obrigatória'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Categoria do produto é obrigatória'],
    enum: ['embalagens-plasticas', 'embalagens-papel', 'embalagens-metal', 'embalagens-vidro', 'outros']
  },
  specifications: {
    type: Map,
    of: String,
    default: {}
  },
  images: {
    thumbnail: {
      type: String,
      required: [true, 'Imagem thumbnail é obrigatória']
    },
    gallery: [{
      type: String
    }],
    sizes: {
      small: String,
      medium: String,
      large: String
    }
  },
  features: [{
    type: String,
    trim: true
  }],
  applications: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  meta: {
    title: String,
    description: String,
    keywords: [String]
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índices para melhor performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ isFeatured: 1, isActive: 1 });

// Virtual para URL amigável
productSchema.virtual('slug').get(function() {
  return this.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
});

// Middleware para limpar dados antes de salvar
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.name = this.name.trim();
  }
  if (this.isModified('description')) {
    this.description = this.description.trim();
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
