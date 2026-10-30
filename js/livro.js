const indice = Number(localStorage.getItem("livroEscolhido"));
const livro = livros[indice];
const btnFavorito = document.getElementById("btnFavorito");

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

document.title = livro.titulo + " - Ponto e Vírgula";
document.getElementById("capa").src = livro.capa;
document.getElementById("capa").alt = "Capa de " + livro.titulo;
document.getElementById("genero").textContent = livro.genero;
document.getElementById("titulo").textContent = livro.titulo;
document.getElementById("autor").textContent = livro.autor;
document.getElementById("sinopse").textContent = livro.sinopse;
document.getElementById("ficha").textContent = livro.paginas + " páginas - publicado em " + livro.ano;
document.getElementById("preco").textContent = formatarPreco(livro.preco);

function atualizarBotao() {
    if (favoritos.includes(indice)) {
        btnFavorito.textContent = "★ Nos favoritos";
        btnFavorito.classList.add("favorito");
    } else {
        btnFavorito.textContent = "☆ Favoritar";
        btnFavorito.classList.remove("favorito");
    }
}

function alternarFavorito() {
    if (favoritos.includes(indice)) {
        favoritos.splice(favoritos.indexOf(indice), 1);
    } else {
        favoritos.push(indice);
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    atualizarBotao();
}

btnFavorito.addEventListener("click", alternarFavorito);
atualizarBotao();
