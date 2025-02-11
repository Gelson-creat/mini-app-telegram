const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../modelos/Usuario');
const router = express.Router();

router.post('/registrar', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const novoUsuario = new Usuario({ nome, email, senha });
        await novoUsuario.save();
        res.status(201).json({ mensagem: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await Usuario.findOne({ email });
        if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
            return res.status(401).json({ erro: 'Credenciais inválidas' });
        }
        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

module.exports = router;
