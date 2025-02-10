const mongoose = require('mongoose');

const AnuncioSchema = new mongoose.Schema({
  categoria: String,
  titulo: String,
  descricao: String,
  fotos: [String],
  preco: Number,
  pagamento: String,
  plano: String,
  dataCriacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Anuncio', AnuncioSchema);
