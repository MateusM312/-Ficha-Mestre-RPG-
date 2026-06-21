function salvarForm() { // salva localmente
    localStorage.setItem('personagemStorage', JSON.stringify(personagemStorage));
}

function abrirForm() {
    const form = document.getElementById('modal');
    form.style.display = 'flex';
}

function fecharForm() {
    document.getElementById('modal').style.display = 'none';
}

function criarPersonagem(){

}