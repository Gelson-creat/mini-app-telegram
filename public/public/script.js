document.addEventListener("DOMContentLoaded", () => {
    console.log("Mini app carregado!");

    // Botão de enviar mensagem para o Telegram
    document.getElementById("botao").addEventListener("click", () => {
        if (window.Telegram.WebApp) {
            window.Telegram.WebApp.showAlert("Mensagem enviada pelo Mini App!");
        } else {
            alert("Telegram WebApp não carregado corretamente.");
        }
    });
});
