require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply('Bem-vindo ao Mini App do Telegram! Escolha uma opção:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: '📢 Ver Anúncios', callback_data: 'ver_anuncios' }],
                [{ text: '💰 Comprar CTF', callback_data: 'comprar_ctf' }],
                [{ text: '📊 Meu Saldo', callback_data: 'meu_saldo' }]
            ]
        }
    });
});

bot.action('ver_anuncios', (ctx) => {
    ctx.answerCbQuery();
    ctx.reply('🔍 Aqui estão os anúncios disponíveis...');
});

bot.action('comprar_ctf', (ctx) => {
    ctx.answerCbQuery();
    ctx.reply('💸 Digite o valor que deseja comprar:');
});

bot.action('meu_saldo', (ctx) => {
    ctx.answerCbQuery();
    ctx.reply('📊 Seu saldo atual é de: 0 CTF');
});

bot.launch();
console.log('🤖 Bot do Telegram está rodando...');
