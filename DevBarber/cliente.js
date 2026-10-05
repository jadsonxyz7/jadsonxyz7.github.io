const clienteLogado = JSON.parse(
    localStorage.getItem("clienteLogadoDevBarber")
);

if (!clienteLogado) {
    window.location.href = "login.html";
}

const nomeCliente = document.getElementById("nomeCliente");
const listaAgendamentos = document.getElementById("listaAgendamentos");
const btnSair = document.getElementById("btnSair");

nomeCliente.textContent = clienteLogado.nome;

mostrarAgendamentos();

function mostrarAgendamentos() {
    const agendamentos = JSON.parse(
        localStorage.getItem("agendamentosDevBarber")
    ) || [];

    const meusAgendamentos = agendamentos.filter((agendamento) => {
        return (
            agendamento.nome.toLowerCase() ===
            clienteLogado.nome.toLowerCase() &&
            agendamento.telefone === clienteLogado.telefone
        );
    });

    if (meusAgendamentos.length === 0) {
        listaAgendamentos.innerHTML = `
            <div class="sem-agendamentos">
                <h3>Nenhum agendamento encontrado</h3>

                <p>
                    Você ainda não possui horários agendados.
                </p>

                <a
                    href="index.html#agendamento"
                    class="botao-principal"
                >
                    Agendar horário
                </a>
            </div>
        `;

        return;
    }

    listaAgendamentos.innerHTML = "";

    meusAgendamentos.forEach((agendamento) => {

        const card = document.createElement("div");

        card.classList.add("agendamento-card");

        card.innerHTML = `
            <div class="agendamento-data">
                <span>${formatarData(agendamento.data)}</span>
                <strong>${agendamento.horario}</strong>
            </div>

            <div class="agendamento-detalhes">

                <h3>
                    ${agendamento.servico}
                </h3>

                <p>
                    Barbeiro: ${agendamento.barbeiro}
                </p>

                <p>
                    Cliente: ${agendamento.nome}
                </p>

                <span class="status-agendamento">
                    ${agendamento.status}
                </span>

            </div>

            <button
                class="botao-cancelar"
                data-id="${agendamento.id}"
            >
                Cancelar
            </button>
        `;

        listaAgendamentos.appendChild(card);
    });

    const botoesCancelar = document.querySelectorAll(
        ".botao-cancelar"
    );

    botoesCancelar.forEach((botao) => {
        botao.addEventListener("click", () => {
            cancelarAgendamento(botao.dataset.id);
        });
    });
}

function cancelarAgendamento(id) {
    const confirmar = confirm(
        "Deseja realmente cancelar este agendamento?"
    );

    if (!confirmar) {
        return;
    }

    let agendamentos = JSON.parse(
        localStorage.getItem("agendamentosDevBarber")
    ) || [];

    agendamentos = agendamentos.filter((agendamento) => {
        return String(agendamento.id) !== String(id);
    });

    localStorage.setItem(
        "agendamentosDevBarber",
        JSON.stringify(agendamentos)
    );

    mostrarAgendamentos();
}

function formatarData(data) {
    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

btnSair.addEventListener("click", () => {

    localStorage.removeItem(
        "clienteLogadoDevBarber"
    );

    window.location.href = "index.html";
});