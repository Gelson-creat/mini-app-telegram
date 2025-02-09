require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Rota principal para carregar o Mini App
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Servidor rodando
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
