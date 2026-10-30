const btnParticipar = document.getElementById("btnParticipar");
const avisoClube = document.getElementById("avisoClube");

function mostrarInscricao() {
    if (localStorage.getItem("inscritoClube") == "sim") {
        btnParticipar.classList.add("oculta");
        avisoClube.textContent = "Você está inscrito no Clube do Livro. Até sábado!";
        avisoClube.classList.remove("oculta");
    }
}

function participar() {
    localStorage.setItem("inscritoClube", "sim");
    mostrarInscricao();
}

btnParticipar.addEventListener("click", participar);
mostrarInscricao();
