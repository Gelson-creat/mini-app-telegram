require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const app = express();

app.use(express.json());

app.post(`/bot${process.env.TELEGRAM_BOT_TOKEN}`, (req, res) => {
    bot.handleUpdate(req.body, res);
});

// Configura o Webhook
bot.telegram.setWebhook(`${process.env.WEBHOOK_URL}/bot${process.env.TELEGRAM_BOT_TOKEN}`);

app.get('/', (req, res) => {
    res.send('🤖 Bot do Telegram está rodando!');
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 8080}`);
});

// Comandos do Bot
bot.start((ctx) => {
    ctx.reply(
        '🚀 Bem-vindo ao Mini App do Telegram!\nEscolha uma opção abaixo:',
        Markup.keyboard([
            ['📋 Ver Anúncios', '💰 Comprar CTF'],
            ['👤 Minha Conta', '❓ Suporte']
        ])
        .resize()
        .oneTime()
    );
});

bot.hears('📋 Ver Anúncios', async (ctx) => {
    ctx.reply('🔍 Aqui estão os anúncios disponíveis:\n(Em breve, integração com o banco de dados)');
});

bot.hears('💰 Comprar CTF', async (ctx) => {
    ctx.reply('💵 Escolha um plano para comprar CTF:', 
        Markup.inlineKeyboard([
            [Markup.button.callback('Plano Básico (5%)', 'comprar_basico')],
            [Markup.button.callback('Plano Plus (7%)', 'comprar_plus')]
        ])
    );
});

bot.action('comprar_basico', async (ctx) => {
    await ctx.answerCbQuery();
    ctx.reply('✅ Você escolheu o Plano Básico! Entre em contato para concluir a compra.');
});

bot.action('comprar_plus', async (ctx) => {
    await ctx.answerCbQuery();
    ctx.reply('✅ Você escolheu o Plano Plus! Entre em contato para concluir a compra.');
});

bot.hears('👤 Minha Conta', async (ctx) => {
    ctx.reply('👤 Seu painel de conta:\n- Saldo CTF: (Em breve integração)\n- Anúncios ativos: (Em breve)');
});

bot.hears('❓ Suporte', async (ctx) => {
    ctx.reply('📞 Entre em contato com o suporte:\n@seu_suporte_telegram');
});

// Para evitar encerramento forçado no Railway
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
