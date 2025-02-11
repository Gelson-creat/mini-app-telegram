require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require('express');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const app = express();

const PORT = process.env.PORT || 8080;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

// Configurar Webhook no Telegram
bot.telegram.setWebhook(`${WEBHOOK_URL}/webhook`);

// Middleware para receber atualizações do Telegram
app.use(express.json());
app.post('/webhook', (req, res) => {
    bot.handleUpdate(req.body, res);
});

// Inicializa o servidor Express
app.get('/', (req, res) => {
    res.send('🚀 Bot do Telegram está rodando com Webhook!');
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

// Remove o `bot.launch()` para evitar conflito com Webhook
