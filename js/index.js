const frases = [
    "livros escolhidos a dedo",
    "resenhas escritas por quem lê de verdade",
    "um clube do livro aos sábados",
    "uma caixa surpresa todo mês",
    "canecas e papelaria para leitores"
];

const palavraGirando = document.getElementById("palavraGirando");
const capaSorteio = document.getElementById("capaSorteio");
const tituloSorteio = document.getElementById("tituloSorteio");
const textoSorteio = document.getElementById("textoSorteio");
const btnSortear = document.getElementById("btnSortear");
const linkSorteio = document.getElementById("linkSorteio");

let fraseAtual = 0;

function mostrarSaudacao() {
    const hora = new Date().getHours();
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    let texto;

    if (hora < 12) {
        texto = "Bom dia! Que tal começar o dia com uma boa leitura?";
    } else if (hora < 18) {
        texto = "Boa tarde! Hora de uma pausa com um livro.";
    } else {
        texto = "Boa noite! Um capítulo antes de dormir?";
    }

    if (favoritos.length > 0) {
        texto += " Você tem " + favoritos.length + " livro(s) nos favoritos.";
    }

    document.getElementById("saudacao").textContent = texto;
}

function trocarFrase() {
    fraseAtual = (fraseAtual + 1) % frases.length;
    palavraGirando.classList.add("saindo");

    setTimeout(function () {
        palavraGirando.textContent = frases[fraseAtual];
        palavraGirando.classList.remove("saindo");
    }, 400);
}

function animarNumero(id, valorFinal) {
    const elemento = document.getElementById(id);
    let valor = 0;

    const timer = setInterval(function () {
        valor++;
        elemento.textContent = valor;
        if (valor >= valorFinal) {
            clearInterval(timer);
        }
    }, 60);
}

function contarResenhas() {
    const resenhas = JSON.parse(localStorage.getItem("resenhas"));
    if (resenhas == null) {
        return 2;
    }
    return resenhas.length;
}

function sortearLivro() {
    let voltas = 0;
    let sorteado = 0;

    btnSortear.disabled = true;
    linkSorteio.classList.add("oculta");
    tituloSorteio.textContent = "Sorteando...";
    textoSorteio.textContent = "";
    capaSorteio.classList.add("girando");

    const timer = setInterval(function () {
        sorteado = Math.floor(Math.random() * livros.length);
        capaSorteio.src = livros[sorteado].capa;
        voltas++;

        if (voltas == 15) {
            clearInterval(timer);
            capaSorteio.classList.remove("girando");
            capaSorteio.alt = "Capa de " + livros[sorteado].titulo;
            tituloSorteio.textContent = livros[sorteado].titulo;
            textoSorteio.textContent = livros[sorteado].autor + " - " + formatarPreco(livros[sorteado].preco);
            escolherLivro(sorteado);
            linkSorteio.classList.remove("oculta");
            btnSortear.textContent = "Sortear de novo";
            btnSortear.disabled = false;
        }
    }, 90);
}

btnSortear.addEventListener("click", sortearLivro);

mostrarSaudacao();
animarNumero("numLivros", livros.length);
animarNumero("numProdutos", produtos.length);
animarNumero("numResenhas", contarResenhas());
setInterval(trocarFrase, 3000);
