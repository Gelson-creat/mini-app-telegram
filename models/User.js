const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: String,
  cpf: String,
  email: String,
  telefone: String,
  saldoCTF: { type: Number, default: 0 },
  anuncios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Anuncio' }]
});

module.exports = mongoose.model('User', UserSchema);
