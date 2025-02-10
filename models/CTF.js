const mongoose = require('mongoose');

const CTFSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  valor: Number,
  plano: String,
  rendimento: { type: Number, default: 5 },
  dataCompra: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CTF', CTFSchema);
