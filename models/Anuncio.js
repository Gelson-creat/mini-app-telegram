const mongoose = require('mongoose');

const AnuncioSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    preco: { type: Number, required: true },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Anuncio', AnuncioSchema);
