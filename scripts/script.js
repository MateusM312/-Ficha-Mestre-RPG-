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
    const nome = document.getElementById("nome").value || "Sem nome";
    const idade = document.getElementById("idade").value || "Sem idade";
    const ocupacao = document.getElementById("ocupacao").value || "Sem ocupação";
    const str = document.getElementById("str").value || "Sem valor";
    const con = document.getElementById("con").value || "Sem valor";
    const siz = document.getElementById("siz").value || "Sem valor";
    const dex = document.getElementById("dex").value || "Sem valor";
    const app = document.getElementById("app").value || "Sem valor";
    const int = document.getElementById("int").value || "Sem valor";
    const pow = document.getElementById("pow").value || "Sem valor";
    const edu = document.getElementById("edu").value || "Sem valor";
    const sanidadeAtual= document.getElementById("sanidadeAtual").value || "Sem valor";
    const sanidadeMax= document.getElementById("sanidadeMax").value || "Sem valor";
    const pvAtual= document.getElementById("pvAtual").value || "Sem PV";
    const pvMax = document.getElementById("pvMax").value || "Sem PV";
    const pmAtual = document.getElementById("pmAtual ").value || "Sem PM";
    const pmMax = document.getElementById("pmMax ").value || "Sem PM";

    const HP = (con + siz)/10;
    const SAN = pow * 5;
    const MP = POW / 5;

    const novoPersonagem = {nome,HP, SAN, MP, idade, ocupacao, str, con, siz, dex, app, int, pow, edu, sanidadeAtual, sanidadeMax, pvAtual, pvMax, pmAtual, pmMax};
    salvarForm();
}