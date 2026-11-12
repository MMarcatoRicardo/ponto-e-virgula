const btnAssinar = document.getElementById("btnAssinar");
const avisoAssinatura = document.getElementById("avisoAssinatura");

function assinar() {
    btnAssinar.disabled = true;
    avisoAssinatura.textContent = "Assinatura feita! Você paga R$ 69,90 por mês e recebe a primeira caixa no mês que vem.";
    avisoAssinatura.classList.remove("oculta");
}

btnAssinar.addEventListener("click", assinar);
