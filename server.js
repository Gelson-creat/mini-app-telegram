require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8080;

// Conectando ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("🔥 Conexão com o MongoDB bem-sucedida!"))
.catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));

app.get('/', (req, res) => {
    res.send("✅ O servidor está rodando e conectado ao MongoDB!");
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
