const formLogin = document.getElementById("formLogin");
const mensagemLogin = document.getElementById("mensagemLogin");

formLogin.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    const clientes = JSON.parse(
        localStorage.getItem("clientesDevBarber")
    ) || [];

    const cliente = clientes.find((cliente) => {
        return (
            cliente.email.toLowerCase() === email.toLowerCase() &&
            cliente.senha === senha
        );
    });

    if (!cliente) {
        mostrarMensagem(
            "E-mail ou senha incorretos.",
            "erro"
        );
        return;
    }

    localStorage.setItem(
        "clienteLogadoDevBarber",
        JSON.stringify(cliente)
    );

    mostrarMensagem(
        `Bem-vindo, ${cliente.nome}!`,
        "sucesso"
    );

    setTimeout(() => {
        window.location.href = "cliente.html";
    }, 1000);
});

function mostrarMensagem(mensagem, tipo) {
    mensagemLogin.textContent = mensagem;

    if (tipo === "sucesso") {
        mensagemLogin.style.color = "#d6a15c";
    } else {
        mensagemLogin.style.color = "#c96b5c";
    }
}