const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rota para registrar usuário
router.post('/register', async (req, res) => {
  try {
    const { nome, cpf, email, telefone } = req.body;
    const novoUsuario = new User({ nome, cpf, email, telefone });
    await novoUsuario.save();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});

module.exports = router;
