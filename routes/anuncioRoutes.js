const express = require('express');
const router = express.Router();
const Anuncio = require('../models/Anuncio');

// Criar anúncio
router.post('/criar', async (req, res) => {
  try {
    const { categoria, titulo, descricao, fotos, preco, pagamento, plano } = req.body;
    const novoAnuncio = new Anuncio({ categoria, titulo, descricao, fotos, preco, pagamento, plano });
    await novoAnuncio.save();
    res.status(201).json({ message: 'Anúncio criado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar anúncio' });
  }
});

module.exports = router;
