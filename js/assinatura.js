const pistas = [
    "Foi escrito por uma autora brasileira.",
    "Tem menos de 100 páginas.",
    "Foi publicado na década de 1970.",
    "A protagonista é uma datilógrafa nordestina que vive no Rio de Janeiro."
];

const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

const valorMensal = document.getElementById("valorMensal");
const detalhePreco = document.getElementById("detalhePreco");
const btnAssinar = document.getElementById("btnAssinar");
const avisoAssinatura = document.getElementById("avisoAssinatura");
const btnPista = document.getElementById("btnPista");
const listaPistas = document.getElementById("listaPistas");
const contagem = document.getElementById("contagem");

let linha = "classicos";
let plano = "mensal";
let pistasReveladas = 0;

const hoje = new Date();
const fechamento = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 1);
document.getElementById("mesCaixa").textContent = meses[fechamento.getMonth()];

function marcarAtivo(seletor, botao) {
    const botoes = document.querySelectorAll(seletor);
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].classList.remove("ativo");
    }
    botao.classList.add("ativo");
}

function escolherLinha(novaLinha, botao) {
    linha = novaLinha;
    marcarAtivo(".btn-escolha", botao);
    mostrarPreco();
}

function escolherPlano(novoPlano, botao) {
    plano = novoPlano;
    marcarAtivo(".btn-ordem", botao);
    mostrarPreco();
}

function calcularPreco() {
    let precoLinha = 69.90;
    let nomeLinha = "Clássicos;";
    if (linha == "novas") {
        precoLinha = 59.90;
        nomeLinha = "Novas vozes;";
    }

    let quantidadeMeses = 1;
    let desconto = 0;
    let nomePlano = "Mensal";
    switch (plano) {
        case "semestral":
            quantidadeMeses = 6;
            desconto = 0.10;
            nomePlano = "Semestral";
            break;
        case "anual":
            quantidadeMeses = 12;
            desconto = 0.20;
            nomePlano = "Anual";
            break;
    }

    let extras = 0;
    let nomesExtras = "";
    if (document.getElementById("extraCaneca").checked) {
        extras = extras + 24.90;
        nomesExtras = " + caneca";
    }
    if (document.getElementById("extraVela").checked) {
        extras = extras + 19.90;
        nomesExtras = nomesExtras + " + vela";
    }

    const mensal = precoLinha - precoLinha * desconto + extras;

    return {
        linha: nomeLinha,
        plano: nomePlano,
        meses: quantidadeMeses,
        mensal: mensal,
        total: mensal * quantidadeMeses,
        economia: precoLinha * desconto * quantidadeMeses,
        extras: nomesExtras
    };
}

function mostrarPreco() {
    const preco = calcularPreco();

    valorMensal.textContent = formatarPreco(preco.mensal);

    if (preco.meses == 1) {
        detalhePreco.textContent = "Cancele quando quiser, sem multa.";
    } else {
        detalhePreco.textContent = preco.meses + " caixas por " + formatarPreco(preco.total) + ". Você economiza " + formatarPreco(preco.economia) + ".";
    }
}

function mostrarAssinatura() {
    const salva = JSON.parse(localStorage.getItem("assinatura"));

    if (salva == null) {
        avisoAssinatura.classList.add("oculta");
        btnAssinar.textContent = "Assinar agora";
    } else {
        avisoAssinatura.innerHTML = `Você assina <strong>${salva.linha}${salva.extras}</strong>, plano <strong>${salva.plano}</strong>, por ${formatarPreco(salva.mensal)}/mês.
            <button class="btn btn-link btn-sm p-0" onclick="cancelarAssinatura()">Cancelar assinatura</button>`;
        avisoAssinatura.classList.remove("oculta");
        btnAssinar.textContent = "Atualizar assinatura";
    }
}

function assinar() {
    localStorage.setItem("assinatura", JSON.stringify(calcularPreco()));
    mostrarAssinatura();
}

function cancelarAssinatura() {
    if (confirm("Deseja mesmo cancelar a assinatura?")) {
        localStorage.removeItem("assinatura");
        mostrarAssinatura();
    }
}

function revelarPista() {
    listaPistas.innerHTML += `<li class="aparecer">${pistas[pistasReveladas]}</li>`;
    pistasReveladas++;

    if (pistasReveladas == pistas.length) {
        btnPista.textContent = "Já descobriu?";
        btnPista.disabled = true;
    } else {
        btnPista.textContent = "Mais uma pista (" + (pistas.length - pistasReveladas) + ")";
    }
}

function doisDigitos(numero) {
    if (numero < 10) {
        return "0" + numero;
    }
    return numero;
}

function atualizarContagem() {
    const segundosRestantes = Math.floor((fechamento - new Date()) / 1000);

    const dias = Math.floor(segundosRestantes / 86400);
    const horas = Math.floor(segundosRestantes / 3600) % 24;
    const minutos = Math.floor(segundosRestantes / 60) % 60;
    const segundos = segundosRestantes % 60;

    contagem.innerHTML = `
        <span><b>${dias}</b>dias</span>
        <span><b>${doisDigitos(horas)}</b>horas</span>
        <span><b>${doisDigitos(minutos)}</b>min</span>
        <span><b>${doisDigitos(segundos)}</b>seg</span>`;
}

btnAssinar.addEventListener("click", assinar);
btnPista.addEventListener("click", revelarPista);

mostrarPreco();
mostrarAssinatura();
atualizarContagem();
setInterval(atualizarContagem, 1000);
