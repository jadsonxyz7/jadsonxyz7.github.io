const formCadastro = document.getElementById("formCadastro");
const mensagemCadastro = document.getElementById("mensagemCadastro");

formCadastro.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (senha !== confirmarSenha) {
        mostrarMensagem(
            "As senhas não são iguais.",
            "erro"
        );
        return;
    }

    const clientes = JSON.parse(
        localStorage.getItem("clientesDevBarber")
    ) || [];

    const emailExiste = clientes.some((cliente) => {
        return cliente.email.toLowerCase() === email.toLowerCase();
    });

    if (emailExiste) {
        mostrarMensagem(
            "Este e-mail já possui uma conta.",
            "erro"
        );
        return;
    }

    const novoCliente = {
        id: Date.now(),
        nome: nome,
        telefone: telefone,
        email: email,
        senha: senha
    };

    clientes.push(novoCliente);

    localStorage.setItem(
        "clientesDevBarber",
        JSON.stringify(clientes)
    );

    mostrarMensagem(
        "Conta criada com sucesso! Redirecionando...",
        "sucesso"
    );

    formCadastro.reset();

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
});

function mostrarMensagem(mensagem, tipo) {
    mensagemCadastro.textContent = mensagem;

    if (tipo === "sucesso") {
        mensagemCadastro.style.color = "#d6a15c";
    } else {
        mensagemCadastro.style.color = "#c96b5c";
    }
}