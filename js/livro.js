const indice = Number(localStorage.getItem("livroEscolhido"));
const livro = livros[indice];

document.title = livro.titulo + " - Ponto e Vírgula";
document.getElementById("capa").src = livro.capa;
document.getElementById("capa").alt = "Capa de " + livro.titulo;
document.getElementById("genero").textContent = livro.genero;
document.getElementById("titulo").textContent = livro.titulo;
document.getElementById("autor").textContent = livro.autor;
document.getElementById("sinopse").textContent = livro.sinopse;
document.getElementById("ficha").textContent = livro.paginas + " páginas - publicado em " + livro.ano;
document.getElementById("preco").textContent = formatarPreco(livro.preco);
