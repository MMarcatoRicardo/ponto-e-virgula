const grade = document.getElementById("grade");
const quantidade = document.getElementById("quantidade");
const busca = document.getElementById("busca");
const contadorSacola = document.getElementById("contadorSacola");
const painelSacola = document.getElementById("painelSacola");
const listaSacola = document.getElementById("listaSacola");
const totalSacola = document.getElementById("totalSacola");
const aviso = document.getElementById("aviso");

const itens = [];
let filtroAtual = "Todos";
let sacola = JSON.parse(localStorage.getItem("sacola")) || [];
let timerAviso;

for (let i = 0; i < livros.length; i++) {
    itens.push({ tipo: "livro", indice: i, nome: livros[i].titulo, detalhe: livros[i].autor, grupo: livros[i].genero, preco: livros[i].preco, imagem: livros[i].capa });
}

for (let i = 0; i < produtos.length; i++) {
    itens.push({ tipo: "produto", nome: produtos[i].nome, detalhe: produtos[i].descricao, grupo: produtos[i].categoria, preco: produtos[i].preco, imagem: produtos[i].imagem });
}

function combinaFiltro(item) {
    if (filtroAtual == "Todos") {
        return true;
    } else if (filtroAtual == "Livros") {
        return item.tipo == "livro";
    }
    return item.grupo == filtroAtual;
}

function combinaBusca(item) {
    const termo = busca.value.toLowerCase();
    return item.nome.toLowerCase().includes(termo) || item.detalhe.toLowerCase().includes(termo);
}

function mostrarItens() {
    let html = "";
    let total = 0;

    for (let i = 0; i < itens.length; i++) {
        const item = itens[i];

        if (combinaFiltro(item) && combinaBusca(item)) {
            let topo = `<img src="${item.imagem}" alt="${item.nome}"><h3>${item.nome}</h3>`;
            let etiqueta = "";

            if (item.tipo == "livro") {
                topo = `<a href="livro.html" onclick="escolherLivro(${item.indice})">${topo}</a>`;
            } else {
                etiqueta = `<span class="selo">${item.grupo}</span>`;
            }

            html += `
                <div class="item">
                    ${etiqueta}
                    ${topo}
                    <p>${item.detalhe}</p>
                    <p class="preco">${formatarPreco(item.preco)}</p>
                    <button class="adicionar" onclick="adicionarSacola(${i})">+ Sacola</button>
                </div>`;
            total++;
        }
    }

    if (total == 0) {
        html = `<p class="vazio">Nada encontrado para "${busca.value}". Tente outra palavra.</p>`;
    }

    grade.innerHTML = html;
    quantidade.textContent = total + " item(ns) encontrado(s)";
}

function filtrar(grupo, botao) {
    const botoes = document.querySelectorAll(".filtro");

    for (let i = 0; i < botoes.length; i++) {
        botoes[i].classList.remove("selecionado");
    }

    botao.classList.add("selecionado");
    filtroAtual = grupo;
    mostrarItens();
}

function mostrarAviso(texto) {
    aviso.textContent = texto;
    aviso.classList.add("visivel");
    clearTimeout(timerAviso);
    timerAviso = setTimeout(function () {
        aviso.classList.remove("visivel");
    }, 2000);
}

function salvarSacola() {
    localStorage.setItem("sacola", JSON.stringify(sacola));
    mostrarSacola();
}

function adicionarSacola(indice) {
    sacola.push({ nome: itens[indice].nome, preco: itens[indice].preco });
    salvarSacola();
    mostrarAviso(itens[indice].nome + " foi para a sacola");
}

function removerSacola(indice) {
    sacola.splice(indice, 1);
    salvarSacola();
}

function mostrarSacola() {
    let html = "";
    let total = 0;

    for (let i = 0; i < sacola.length; i++) {
        total = total + sacola[i].preco;
        html += `<li><span>${sacola[i].nome}</span><span>${formatarPreco(sacola[i].preco)} <button class="remover" onclick="removerSacola(${i})" title="Remover">×</button></span></li>`;
    }

    if (sacola.length == 0) {
        html = "<li>Sua sacola está vazia.</li>";
    }

    listaSacola.innerHTML = html;
    totalSacola.textContent = formatarPreco(total);
    contadorSacola.textContent = sacola.length;
}

document.getElementById("btnSacola").addEventListener("click", function () {
    painelSacola.classList.toggle("oculta");
});

document.getElementById("fecharSacola").addEventListener("click", function () {
    painelSacola.classList.add("oculta");
});

document.getElementById("btnEsvaziar").addEventListener("click", function () {
    sacola = [];
    salvarSacola();
});

document.getElementById("btnFinalizar").addEventListener("click", function () {
    if (sacola.length == 0) {
        mostrarAviso("Adicione algum item antes de reservar");
        return;
    }
    mostrarAviso("Reserva feita! Retire em até 3 dias na loja");
    sacola = [];
    salvarSacola();
    painelSacola.classList.add("oculta");
});

busca.addEventListener("input", mostrarItens);

mostrarItens();
mostrarSacola();
