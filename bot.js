require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');

if (!global.botInstance) {
    const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
    global.botInstance = bot;

    // Comando /start
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

    // Respostas para cada opção
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

    // Inicia o bot
    bot.launch().then(() => console.log('🤖 Bot do Telegram iniciado com sucesso!'));

    // Para evitar encerramento forçado no Railway
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));

} else {
    console.log("⚠️ O bot já está rodando!");
}
