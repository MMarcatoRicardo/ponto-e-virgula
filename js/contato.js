function enviarContato() {
    const nome = document.getElementById("nome").value;
    const assunto = document.getElementById("assunto").value;
    const aviso = document.getElementById("aviso");

    aviso.textContent = "Obrigado, " + nome + "! Recebemos sua mensagem sobre \"" + assunto + "\" e vamos responder por e-mail.";
    aviso.classList.remove("oculta");
    document.getElementById("formContato").reset();

    return false;
}
