const express = require('express');
const Usuario = require('../modelos/Usuario');
const CTF = require('../modelos/CTF');
const router = express.Router();

router.post('/comprar', async (req, res) => {
    try {
        const { usuarioId, quantidade } = req.body;
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

        usuario.saldoCTF += quantidade;
        await usuario.save();

        const transacao = new CTF({ usuarioId, quantidade, tipo: 'compra' });
        await transacao.save();

        res.json({ mensagem: 'Compra de CTF realizada com sucesso!', saldo: usuario.saldoCTF });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

module.exports = router;
