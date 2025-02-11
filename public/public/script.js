document.addEventListener("DOMContentLoaded", () => {
    console.log("Mini App do Telegram carregado!");

    // Simulação de conexão com API do Mini App
    fetch('/api/status')
        .then(response => response.json())
        .then(data => {
            document.getElementById("status").innerText = `🔵 Status: ${data.status}`;
        })
        .catch(error => {
            console.error("Erro ao conectar com API:", error);
            document.getElementById("status").innerText = "🔴 Status: Offline";
        });

    // Exemplo de clique no botão para comprar CTF
    document.getElementById("comprarCTF").addEventListener("click", () => {
        fetch('/api/ctf/comprar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuarioId: "123", quantidade: 10 })
        })
        .then(response => response.json())
        .then(data => {
            alert(`Compra realizada com sucesso! Novo saldo: ${data.saldo}`);
        })
        .catch(error => console.error("Erro na compra de CTF:", error));
    });
});
