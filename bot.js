require("dotenv").config();
const { Telegraf } = require("telegraf");
const express = require("express");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!BOT_TOKEN) {
    console.error("ERRO: Token do Telegram não encontrado!");
    process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);
const app = express();

const PORT = process.env.PORT || 8080;
const URL_DO_WEBHOOK = process.env.PUBLIC_URL || "https://mini-app-telegram-produção-1f4d.up.railway.app";

// Configurar webhook no Telegram
bot.telegram.setWebhook(`${URL_DO_WEBHOOK}/webhook`);
app.use(bot.webhookCallback("/webhook"));

// Rota de teste
app.get("/", (req, res) => {
    res.send("🤖 Bot do Telegram está rodando!");
});

// Iniciar o servidor Express
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

// Resposta ao iniciar o bot
bot.start((ctx) => {
    ctx.reply("🚀 Bem-vindo ao Mini App do Telegram!\nEscolha uma opção:", {
        reply_markup: {
            keyboard: [
                ["📋 Ver Anúncios", "💰 Comprar CTF"],
                ["👤 Minha Conta", "❓ Suporte"]
            ],
            resize_keyboard: true,
        },
    });
});

// Iniciar o bot
bot.launch();
