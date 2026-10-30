const lista = document.getElementById("listaResenhas");
const resumo = document.getElementById("resumo");

let resenhas = JSON.parse(localStorage.getItem("resenhas"));

if (resenhas == null) {
    resenhas = [
        { nome: "Marina", livro: 0, titulo: "Capitu continua um mistério", nota: 5, texto: "Li na escola e reli agora. Cada vez que leio mudo de opinião sobre Capitu, e acho que é isso que faz o livro ser tão bom." },
        { nome: "Lucas", livro: 2, titulo: "Aventura na medida certa", nota: 4, texto: "Mais leve que O Senhor dos Anéis e ótimo para começar no mundo de Tolkien. A parte do dragão é a melhor." }
    ];
    localStorage.setItem("resenhas", JSON.stringify(resenhas));
}

function estrelas(nota) {
    let texto = "";

    for (let i = 1; i <= 5; i++) {
        if (i <= nota) {
            texto += "★";
        } else {
            texto += "☆";
        }
    }

    return texto;
}

function mostrarResenhas() {
    if (resenhas.length == 0) {
        resumo.textContent = "Ainda não há resenhas. Seja o primeiro a escrever!";
        lista.innerHTML = "";
        return;
    }

    let html = "";
    let soma = 0;

    for (let i = 0; i < resenhas.length; i++) {
        let r = resenhas[i];
        soma += r.nota;
        html += `
            <div class="col-md-6 col-lg-4">
                <article class="card resenha">
                    <div class="card-body">
                        <p class="estrelas">${estrelas(r.nota)}</p>
                        <h3 class="card-title">${r.titulo}</h3>
                        <p class="livro-resenha">${livros[r.livro].titulo}</p>
                        <p class="card-text">${r.texto}</p>
                        <p class="autor-resenha">por ${r.nome}</p>
                        <button class="btn btn-outline-danger btn-sm" onclick="excluirResenha(${i})">Excluir</button>
                    </div>
                </article>
            </div>`;
    }

    let media = soma / resenhas.length;
    resumo.textContent = resenhas.length + " resenha(s) publicada(s) - nota média " + media.toFixed(1);
    lista.innerHTML = html;
}

function excluirResenha(indice) {
    if (confirm("Deseja excluir esta resenha?")) {
        resenhas.splice(indice, 1);
        localStorage.setItem("resenhas", JSON.stringify(resenhas));
        mostrarResenhas();
    }
}

mostrarResenhas();
