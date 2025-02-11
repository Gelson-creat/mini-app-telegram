const express = require('express');
const router = express.Router();
const Anuncio = require('../modelos/Anuncio');

router.post('/', async (req, res) => {
    try {
        const novoAnuncio = new Anuncio(req.body);
        await novoAnuncio.save();
        res.status(201).json(novoAnuncio);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const anuncios = await Anuncio.find();
        res.json(anuncios);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

module.exports = router;
