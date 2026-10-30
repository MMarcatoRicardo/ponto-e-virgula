const ranking = [
    { livro: 8, vendas: 342, variacao: 2, nota: 4.8, trecho: "Quando retirei a faca da mala de roupas, embrulhada em um pedaço de tecido antigo e encardido...", elogio: "Li em dois dias e ainda penso em Bibiana e Belonísia. É um livro que fica na gente.", leitor: "Camila R." },
    { livro: 3, vendas: 298, variacao: 0, nota: 4.9, trecho: "Só se vê bem com o coração. O essencial é invisível aos olhos.", elogio: "Releio todo ano e sempre encontro uma frase nova para guardar.", leitor: "Pedro H." },
    { livro: 0, vendas: 251, variacao: 1, nota: 4.6, trecho: "Uma noite destas, vindo da cidade para o Engenho Novo, encontrei no trem da Central um rapaz aqui do bairro...", elogio: "Entrei no clube achando que ia ser chato. Saí discutindo Capitu com todo mundo.", leitor: "Larissa M." },
    { livro: 10, vendas: 230, variacao: -2, nota: 4.5, trecho: "Entre a vida e a morte existe uma biblioteca.", elogio: "Me fez pensar nas escolhas que fiz sem me deixar triste. Recomendo muito.", leitor: "João V." },
    { livro: 6, vendas: 214, variacao: 0, nota: 4.8, trecho: "O Sr. e a Sra. Dursley, da rua dos Alfeneiros, nº 4, se orgulhavam de dizer que eram perfeitamente normais...", elogio: "Comprei para o meu filho e acabei lendo primeiro. A magia continua a mesma.", leitor: "Fernanda S." },
    { livro: 1, vendas: 187, variacao: 3, nota: 4.7, trecho: "Era um dia frio e luminoso de abril, e os relógios davam treze horas.", elogio: "Assustador como parece atual. Deveria ser leitura obrigatória.", leitor: "Rafael T." },
    { livro: 2, vendas: 163, variacao: -1, nota: 4.7, trecho: "Numa toca no chão vivia um hobbit.", elogio: "Aventura leve e divertida, perfeita para quem quer começar Tolkien.", leitor: "Bruna L." },
    { livro: 7, vendas: 149, variacao: 4, nota: 4.4, trecho: "E de que serve um livro sem figuras nem diálogos?", elogio: "Absurdo do jeito mais gostoso. Li em voz alta com a minha sobrinha.", leitor: "Thiago A." }
];

const corpoRanking = document.getElementById("corpoRanking");
const filtroGenero = document.getElementById("filtroGenero");
const trecho = document.getElementById("trecho");
const opcoes = document.getElementById("opcoes");
const resultadoQuiz = document.getElementById("resultadoQuiz");
const btnProximo = document.getElementById("btnProximo");
const placar = document.getElementById("placar");
const elogioTexto = document.getElementById("elogioTexto");
const elogioAutor = document.getElementById("elogioAutor");
const pontos = document.getElementById("pontos");

let criterio = "posicao";
let trechoAtual = Math.floor(Math.random() * ranking.length);
let elogioAtual = 0;
let acertos = Number(localStorage.getItem("acertosTrecho")) || 0;

for (let i = 0; i < ranking.length; i++) {
    ranking[i].posicao = i + 1;
}

function abrirLivro(indice) {
    escolherLivro(indice);
    window.location.href = "livro.html";
}

function formatarNota(nota) {
    return nota.toFixed(1).replace(".", ",");
}

function desenharPosicao(posicao) {
    const medalhas = ["🥇", "🥈", "🥉"];
    if (posicao <= 3) {
        return medalhas[posicao - 1];
    }
    return posicao + "º";
}

function desenharTendencia(variacao) {
    if (variacao > 0) {
        return `<span class="tendencia sobe" title="Subiu ${variacao} posições">▲${variacao}</span>`;
    } else if (variacao < 0) {
        return `<span class="tendencia desce" title="Caiu ${-variacao} posições">▼${-variacao}</span>`;
    }
    return `<span class="tendencia igual" title="Manteve a posição">●</span>`;
}

function valorDoCriterio(item) {
    switch (criterio) {
        case "menorPreco":
            return livros[item.livro].preco;
        case "maiorPreco":
            return -livros[item.livro].preco;
        case "nota":
            return -item.nota;
        default:
            return item.posicao;
    }
}

function ordenarLista(lista) {
    for (let i = 0; i < lista.length - 1; i++) {
        for (let j = 0; j < lista.length - 1 - i; j++) {
            if (valorDoCriterio(lista[j]) > valorDoCriterio(lista[j + 1])) {
                const troca = lista[j];
                lista[j] = lista[j + 1];
                lista[j + 1] = troca;
            }
        }
    }
    return lista;
}

function preencherGeneros() {
    const generos = [];
    for (let i = 0; i < ranking.length; i++) {
        const genero = livros[ranking[i].livro].genero;
        if (!generos.includes(genero)) {
            generos.push(genero);
            filtroGenero.innerHTML += `<option value="${genero}">${genero}</option>`;
        }
    }
}

function mostrarRanking() {
    const genero = filtroGenero.value;
    const maiorVenda = ranking[0].vendas;
    let lista = [];
    let html = "";

    for (let i = 0; i < ranking.length; i++) {
        if (genero == "Todos" || livros[ranking[i].livro].genero == genero) {
            lista.push(ranking[i]);
        }
    }

    lista = ordenarLista(lista);

    for (let i = 0; i < lista.length; i++) {
        const item = lista[i];
        const livro = livros[item.livro];
        const largura = item.vendas / maiorVenda * 100;

        html += `
            <tr class="linha-livro" onclick="abrirLivro(${item.livro})" title="Ver detalhes de ${livro.titulo}">
                <td class="posicao">${desenharPosicao(item.posicao)} ${desenharTendencia(item.variacao)}</td>
                <td>
                    <div class="d-flex align-items-center gap-2">
                        <img class="miniatura" src="${livro.capa}" alt="Capa de ${livro.titulo}">
                        <div><strong>${livro.titulo}</strong><br><small class="text-muted">${livro.autor}</small></div>
                    </div>
                </td>
                <td>${livro.genero}</td>
                <td>
                    ${item.vendas}
                    <div class="barra-vendas"><div class="barra-preenchida" style="width: ${largura}%"></div></div>
                </td>
                <td class="nota">★ ${formatarNota(item.nota)}</td>
                <td class="preco">${formatarPreco(livro.preco)}</td>
            </tr>`;
    }

    corpoRanking.innerHTML = html;
}

function ordenar(novoCriterio, botao) {
    const botoes = document.querySelectorAll(".btn-ordem");
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].classList.remove("ativo");
    }
    botao.classList.add("ativo");
    criterio = novoCriterio;
    mostrarRanking();
}

function calcularNumeros() {
    let total = 0;
    let melhor = ranking[0];
    const generos = [];
    const somas = [];

    for (let i = 0; i < ranking.length; i++) {
        const genero = livros[ranking[i].livro].genero;
        const posicao = generos.indexOf(genero);

        total = total + ranking[i].vendas;

        if (ranking[i].nota > melhor.nota) {
            melhor = ranking[i];
        }

        if (posicao == -1) {
            generos.push(genero);
            somas.push(ranking[i].vendas);
        } else {
            somas[posicao] = somas[posicao] + ranking[i].vendas;
        }
    }

    let maior = 0;
    for (let i = 1; i < somas.length; i++) {
        if (somas[i] > somas[maior]) {
            maior = i;
        }
    }

    contarAte(document.getElementById("totalVendas"), total);
    document.getElementById("campeao").textContent = livros[ranking[0].livro].titulo;
    document.getElementById("melhorNota").textContent = livros[melhor.livro].titulo + " ★ " + formatarNota(melhor.nota);
    document.getElementById("generoTop").textContent = generos[maior];

    document.getElementById("cardCampeao").addEventListener("click", function () {
        abrirLivro(ranking[0].livro);
    });
    document.getElementById("cardMelhorNota").addEventListener("click", function () {
        abrirLivro(melhor.livro);
    });
}

function contarAte(elemento, valorFinal) {
    let valor = 0;
    const timer = setInterval(function () {
        valor = valor + 50;
        if (valor >= valorFinal) {
            valor = valorFinal;
            clearInterval(timer);
        }
        elemento.textContent = valor;
    }, 25);
}

function atualizarPlacar() {
    if (acertos == 1) {
        placar.textContent = "1 acerto";
    } else {
        placar.textContent = acertos + " acertos";
    }
}

function sortearOpcoes(correto) {
    const lista = [];
    while (lista.length < 2) {
        const sorteado = ranking[Math.floor(Math.random() * ranking.length)].livro;
        if (sorteado != correto && !lista.includes(sorteado)) {
            lista.push(sorteado);
        }
    }
    lista.splice(Math.floor(Math.random() * 3), 0, correto);
    return lista;
}

function mostrarTrecho() {
    const item = ranking[trechoAtual];
    const lista = sortearOpcoes(item.livro);
    let html = "";

    for (let i = 0; i < lista.length; i++) {
        html += `<button class="btn btn-opcao btn-sm" onclick="responder(this, ${lista[i]}, ${item.livro})">${livros[lista[i]].titulo}</button>`;
    }

    trecho.textContent = "“" + item.trecho + "”";
    opcoes.innerHTML = html;
    resultadoQuiz.classList.add("oculta");
    btnProximo.classList.add("oculta");
}

function responder(botao, escolhido, correto) {
    const botoes = opcoes.querySelectorAll("button");
    const titulo = livros[correto].titulo;

    for (let i = 0; i < botoes.length; i++) {
        botoes[i].disabled = true;
        if (botoes[i].textContent == titulo) {
            botoes[i].classList.add("certo");
        }
    }

    if (escolhido == correto) {
        acertos++;
        localStorage.setItem("acertosTrecho", acertos);
        resultadoQuiz.innerHTML = `Acertou! O trecho é de <strong>${titulo}</strong>. <a href="livro.html" onclick="escolherLivro(${correto})">Ver o livro</a>`;
    } else {
        botao.classList.add("errado");
        resultadoQuiz.innerHTML = `Quase! Esse trecho é de <strong>${titulo}</strong>. <a href="livro.html" onclick="escolherLivro(${correto})">Ver o livro</a>`;
    }

    atualizarPlacar();
    resultadoQuiz.classList.remove("oculta");
    btnProximo.classList.remove("oculta");
}

function proximoTrecho() {
    trechoAtual = (trechoAtual + 1) % ranking.length;
    mostrarTrecho();
}

function mostrarElogio(indice) {
    const item = ranking[indice];
    let html = "";

    elogioAtual = indice;
    elogioTexto.textContent = "“" + item.elogio + "”";
    elogioAutor.textContent = "— " + item.leitor + ", sobre " + livros[item.livro].titulo;

    for (let i = 0; i < ranking.length; i++) {
        if (i == indice) {
            html += `<span class="ativo" onclick="mostrarElogio(${i})"></span>`;
        } else {
            html += `<span onclick="mostrarElogio(${i})"></span>`;
        }
    }
    pontos.innerHTML = html;
}

function proximoElogio() {
    mostrarElogio((elogioAtual + 1) % ranking.length);
}

filtroGenero.addEventListener("change", mostrarRanking);
btnProximo.addEventListener("click", proximoTrecho);

preencherGeneros();
mostrarRanking();
calcularNumeros();
atualizarPlacar();
mostrarTrecho();
mostrarElogio(0);
setInterval(proximoElogio, 6000);
