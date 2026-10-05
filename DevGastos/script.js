const formulario = document.getElementById("formulario");
const descricao = document.getElementById("descricao");
const valor = document.getElementById("valor");
const tipo = document.getElementById("tipo");
const lista = document.getElementById("lista");
const saldo = document.getElementById("saldo");
const entradas = document.getElementById("entradas");
const saidas = document.getElementById("saidas");

let movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];

function mostrarMovimentacoes() {
    lista.innerHTML = "";
    let totalEntradas = 0;
    let totalSaidas = 0;
    movimentacoes.forEach((movimentacao, index) => {
        const div = document.createElement("div");
        div.classList.add("movimentacao");

        const info = document.createElement("div");
        info.classList.add("movimentacao-info");

        const nome = document.createElement("h3");
        nome.textContent = movimentacao.descricao;

        const valorMovimentacao = document.createElement("p");
        valorMovimentacao.textContent = `R$ ${movimentacao.valor.toFixed(2)}`;

        if (movimentacao.tipo === "entrada") {
            valorMovimentacao.classList.add("entrada")
            totalEntradas += movimentacao.valor;
        }
        else {
            valorMovimentacao.classList.add("saida");
            totalSaidas += movimentacao.valor;
        }

        info.appendChild(nome);
        info.appendChild(valorMovimentacao);
        const botao = document.createElement("button");
        botao.textContent = "Excluir";
        botao.classList.add("botao-excluir");
        botao.addEventListener("click", () => {
            excluirMovimentacao(index);
        });
        div.appendChild(info);
        div.appendChild(botao);
        lista.appendChild(div);
    });
    const total = totalEntradas - totalSaidas;
    saldo.textContent = `R$ ${total.toFixed(2)}`;
    entradas.textContent = `R$ ${totalEntradas.toFixed(2)}`;
    saidas.textContent = `R$ ${totalSaidas.toFixed(2)}`;
}

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const novaMovimentacao = {
        descricao: descricao.value,
        valor: Number(valor.value),
        tipo: tipo.value
    };
    movimentacoes.push(novaMovimentacao);
    localStorage.setItem(
        "movimentacoes",
        JSON.stringify(movimentacoes)
    );
    formulario.reset();
    mostrarMovimentacoes();
});

function excluirMovimentacao(index) {
    movimentacoes.splice(index, 1);
    localStorage.setItem(
        "movimentacoes",
        JSON.stringify(movimentacoes)
    );
    mostrarMovimentacoes();
}
mostrarMovimentacoes();