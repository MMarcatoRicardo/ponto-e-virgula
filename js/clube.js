const btnParticipar = document.getElementById("btnParticipar");
const avisoClube = document.getElementById("avisoClube");

function participar() {
    btnParticipar.classList.add("oculta");
    avisoClube.textContent = "Você está inscrito no Clube do Livro. Até sábado!";
    avisoClube.classList.remove("oculta");
}

btnParticipar.addEventListener("click", participar);
