const capaSorteio = document.getElementById("capaSorteio");
const tituloSorteio = document.getElementById("tituloSorteio");
const textoSorteio = document.getElementById("textoSorteio");
const btnSortear = document.getElementById("btnSortear");

function sortearLivro() {
    const sorteado = Math.floor(Math.random() * livros.length);

    capaSorteio.src = livros[sorteado].capa;
    capaSorteio.alt = "Capa de " + livros[sorteado].titulo;
    tituloSorteio.textContent = livros[sorteado].titulo;
    textoSorteio.textContent = livros[sorteado].autor + " - " + formatarPreco(livros[sorteado].preco);
    escolherLivro(sorteado);
    btnSortear.textContent = "Sortear de novo";
}

btnSortear.addEventListener("click", sortearLivro);

escolherLivro(2);
