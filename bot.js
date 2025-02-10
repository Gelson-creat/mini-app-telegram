require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require('express');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const app = express();

const PORT = process.env.PORT || 8080;
const WEBHOOK_URL = `https://mini-app-telegram-production-1f4d.up.railway.app`; // Use a URL do seu Railway

// Configurar o webhook no Telegram
bot.telegram.setWebhook(`${WEBHOOK_URL}/webhook`);

// Middleware para receber atualizações do Telegram via webhook
app.use(bot.webhookCallback('/webhook'));

app.get('/', (req, res) => {
  res.send('🤖 Bot do Telegram está rodando!');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

bot.start((ctx) => {
    ctx.reply('🚀 Bem-vindo ao Mini App do Telegram!\nEscolha uma opção abaixo:', {
        reply_markup: {
            keyboard: [
                ['📋 Ver Anúncios', '💰 Comprar CTF'],
                ['👤 Minha Conta', '❓ Suporte']
            ],
            resize_keyboard: true
        }
    });
});

// Adicione aqui os comandos do seu bot...

console.log('🤖 Bot do Telegram iniciado com sucesso!');
