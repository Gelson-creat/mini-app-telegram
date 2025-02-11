require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require('express');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const app = express();

const PORT = process.env.PORT || 8080;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

bot.telegram.setWebhook(`${WEBHOOK_URL}/webhook`);
app.use(bot.webhookCallback('/webhook'));

app.get('/', (req, res) => {
    res.send('🤖 Bot do Telegram está rodando!');
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

bot.start((ctx) => {
    ctx.reply('🚀 Bem-vindo ao Mini App do Telegram! Escolha uma opção:', {
        reply_markup: {
            keyboard: [
                ['📋 Ver Anúncios', '💰 Comprar CTF'],
                ['👤 Minha Conta', '❓ Suporte']
            ],
            resize_keyboard: true
        }
    });
});

bot.launch();
