const campoLivro = document.getElementById("livro");
const aviso = document.getElementById("aviso");

for (let i = 0; i < livros.length; i++) {
    campoLivro.innerHTML += `<option value="${i}">${livros[i].titulo}</option>`;
}

campoLivro.value = localStorage.getItem("livroEscolhido") || 0;

function salvarResenha() {
    let resenhas = JSON.parse(localStorage.getItem("resenhas")) || [];

    let resenha = {
        nome: document.getElementById("nome").value,
        livro: Number(campoLivro.value),
        titulo: document.getElementById("titulo").value,
        nota: Number(document.getElementById("nota").value),
        texto: document.getElementById("texto").value
    };

    resenhas.push(resenha);
    localStorage.setItem("resenhas", JSON.stringify(resenhas));

    aviso.innerHTML = `Obrigado, ${resenha.nome}! Sua resenha de <strong>${livros[resenha.livro].titulo}</strong> foi publicada. <a href="resenhas.html">Ver resenhas</a>`;
    aviso.classList.remove("oculta");
    document.getElementById("formResenha").reset();

    return false;
}
