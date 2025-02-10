const express = require('express');
const router = express.Router();
const CTF = require('../models/CTF');

// Comprar CTF
router.post('/comprar', async (req, res) => {
  try {
    const { usuario, valor, plano } = req.body;
    const novoCTF = new CTF({ usuario, valor, plano, rendimento: plano === 'plus' ? 7 : 5 });
    await novoCTF.save();
    res.status(201).json({ message: 'CTF comprado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao comprar CTF' });
  }
});

module.exports = router;
