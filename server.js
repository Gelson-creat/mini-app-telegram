require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const anuncioRoutes = require('./rotas/anuncioRoutes');
const authRoutes = require('./rotas/authRoutes');
const ctfRoutes = require('./rotas/ctfRoutes');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB conectado'))
.catch(err => console.error('Erro ao conectar MongoDB:', err));

app.use('/api/anuncios', anuncioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ctf', ctfRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
