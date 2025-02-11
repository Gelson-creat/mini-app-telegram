const mongoose = require('mongoose');

const CTFSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    quantidade: { type: Number, required: true },
    tipo: { type: String, enum: ['compra', 'venda'], required: true },
    data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CTF', CTFSchema);
