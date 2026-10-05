const formAgendamento = document.getElementById("formAgendamento");
const mensagemAgendamento = document.getElementById("mensagemAgendamento");
const campoData = document.getElementById("data");

const clienteAgendamento = document.getElementById(
    "clienteAgendamento"
);


// VERIFICA CLIENTE LOGADO

const clienteLogado = JSON.parse(
    localStorage.getItem("clienteLogadoDevBarber")
);


// DATA ATUAL

const hoje = new Date();

const ano = hoje.getFullYear();

const mes = String(
    hoje.getMonth() + 1
).padStart(2, "0");

const dia = String(
    hoje.getDate()
).padStart(2, "0");

const dataAtual = `${ano}-${mes}-${dia}`;

campoData.min = dataAtual;


// MOSTRA CLIENTE LOGADO

if (clienteLogado) {

    clienteAgendamento.innerHTML = `
        <strong>
            ${clienteLogado.nome}
        </strong>

        <span>
            ${clienteLogado.telefone}
        </span>
    `;

} else {

    clienteAgendamento.innerHTML = `
        <strong>
            Faça login para agendar
        </strong>

        <span>
            Entre na sua conta para continuar.
        </span>
    `;
}


// ENVIO DO FORMULÁRIO

formAgendamento.addEventListener("submit", (evento) => {

    evento.preventDefault();


    // VERIFICA LOGIN

    if (!clienteLogado) {

        mostrarMensagem(
            "Você precisa entrar na sua conta para realizar um agendamento.",
            "erro"
        );

        return;
    }


    // PEGA OS DADOS

    const servico = document.getElementById(
        "servico"
    ).value;

    const barbeiro = document.getElementById(
        "barbeiro"
    ).value;

    const data = document.getElementById(
        "data"
    ).value;

    const horario = document.getElementById(
        "horario"
    ).value;


    // VERIFICA CAMPOS

    if (
        !servico ||
        !barbeiro ||
        !data ||
        !horario
    ) {

        mostrarMensagem(
            "Preencha todos os campos.",
            "erro"
        );

        return;
    }


    // VERIFICA DOMINGO

    const dataEscolhida = new Date(
        `${data}T00:00:00`
    );

    const diaSemana = dataEscolhida.getDay();


    if (diaSemana === 0) {

        mostrarMensagem(
            "A DevBarber não funciona aos domingos.",
            "erro"
        );

        return;
    }


    // PEGA AGENDAMENTOS EXISTENTES

    const agendamentos = JSON.parse(
        localStorage.getItem(
            "agendamentosDevBarber"
        )
    ) || [];


    // VERIFICA HORÁRIO OCUPADO

    const horarioOcupado = agendamentos.some(
        (agendamento) => {

            return (
                agendamento.barbeiro === barbeiro &&
                agendamento.data === data &&
                agendamento.horario === horario &&
                agendamento.status !== "Cancelado"
            );

        }
    );


    if (horarioOcupado) {

        mostrarMensagem(
            "Esse horário já está ocupado para este barbeiro.",
            "erro"
        );

        return;
    }


    // CRIA NOVO AGENDAMENTO

    const novoAgendamento = {

        id: Date.now(),

        clienteId: clienteLogado.id,

        nome: clienteLogado.nome,

        telefone: clienteLogado.telefone,

        email: clienteLogado.email,

        servico: servico,

        barbeiro: barbeiro,

        data: data,

        horario: horario,

        status: "Agendado"

    };


    // ADICIONA NA LISTA

    agendamentos.push(
        novoAgendamento
    );


    // SALVA NO LOCALSTORAGE

    localStorage.setItem(
        "agendamentosDevBarber",
        JSON.stringify(agendamentos)
    );


    // MOSTRA MENSAGEM

    mostrarMensagem(
        `Agendamento confirmado! ${clienteLogado.nome}, seu horário foi reservado para ${formatarData(data)} às ${horario}.`,
        "sucesso"
    );


    // LIMPA FORMULÁRIO

    formAgendamento.reset();


    // MANTÉM DATA MÍNIMA

    campoData.min = dataAtual;

});


// FORMATA DATA

function formatarData(data) {

    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}


// MOSTRA MENSAGEM

function mostrarMensagem(
    mensagem,
    tipo
) {

    mensagemAgendamento.textContent =
        mensagem;


    if (tipo === "sucesso") {

        mensagemAgendamento.style.color =
            "#d6a15c";

    } else {

        mensagemAgendamento.style.color =
            "#c96b5c";

    }

}