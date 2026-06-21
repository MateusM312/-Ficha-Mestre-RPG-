let personagemStorage = JSON.parse(localStorage.getItem('personagemStorage')) || [];

function salvarForm() {
    localStorage.setItem('personagemStorage', JSON.stringify(personagemStorage));
}

function abrirForm() {
    document.getElementById('modal').style.display = 'flex';
}

function fecharForm() {
    document.getElementById('modal').style.display = 'none';
}

function calcPorcentagem(atual, max) {
    if (max <= 0) return 0;
    return Math.min(100, Math.floor((atual / max) * 100));
}

function criarPersonagem() {
    const nome     = document.getElementById("iName").value || "Sem nome";
    const idade    = document.getElementById("iDade").value || "Sem idade";
    const ocupacao = document.getElementById("iocup").value || "Sem ocupação";
    const str      = parseInt(document.getElementById("iFor").value) || 0;
    const con      = parseInt(document.getElementById("iConst").value) || 0;
    const siz      = parseInt(document.getElementById("iTam").value) || 0;
    const dex      = parseInt(document.getElementById("iDes").value) || 0;
    const app      = parseInt(document.getElementById("iApar").value) || 0;
    const int      = parseInt(document.getElementById("iTen").value) || 0;
    const pow      = parseInt(document.getElementById("iPower").value) || 0;
    const edu      = parseInt(document.getElementById("iEduc").value) || 0;
    const sanAtual      = parseInt(document.getElementById("iSanAt").value) || 0;
    const sanMax      = parseInt(document.getElementById("iSanMax").value) || 0;
    const pvAtual      = parseInt(document.getElementById("iPvAt").value) || 0;
    const pvMax      = parseInt(document.getElementById("iPvMax").value) || 0;
    const pmAtual      = parseInt(document.getElementById("iPmAt").value) || 0;
    const pmMax      = parseInt(document.getElementById("iPmMax").value) || 0;

    const HP  = Math.floor((con + siz) / 10);
    const SAN = pow * 5;
    const MP  = Math.floor(pow / 5);

    const novoPersonagem = { nome, idade, ocupacao, str, con, siz, dex, app, int, pow, edu, HP, SAN, MP, sanAtual, sanMax, pvAtual, pvMax, pmAtual, pmMax};
    personagemStorage.push(novoPersonagem);
    salvarForm();
    renderizarPersonagem(novoPersonagem);
    fecharForm();
}

function renderizarPersonagem(p) {
    const personagem = document.createElement('div');
    personagem.className = 'card';
    personagem.innerHTML = `
        <h1>${p.nome}</h1>
        <p>${p.ocupacao} - <label>${p.idade} Anos</label></p>
        <div><i class="fa-regular fa-heart"></i>
            <div class="background-bar">
                <div class="up-background-bar" style="width: ${calcPorcentagem(p.pvAtual, p.pvMax)}%"></div>
            </div>
            <p>${p.pvAtual}/${p.pvMax}</p>
        </div>
        <div><i class="fa-solid fa-brain"></i>
            <div class="background-bar">
                <div class="up-background-bar" style="width: ${calcPorcentagem(p.sanAtual, p.sanMax)}%"></div>
            </div>
            <p>${p.sanAtual}/${p.sanMax}</p>
        </div>
        <div><i class="fa-solid fa-bolt"></i>
            <div class="background-bar">
                <div class="up-background-bar" style="width: ${calcPorcentagem(p.pmAtual, p.pmMax)}%"></div>
            </div>
            <p>${p.pmAtual}/${p.pmMax}</p>
        </div>
        <hr>
        <div>
            <div class="stats"><p>FOR</p><div class="stats-number">${p.str}</div></div>
            <div class="stats"><p>DES</p><div class="stats-number">${p.dex}</div></div>
            <div class="stats"><p>INT</p><div class="stats-number">${p.int}</div></div>
            <div class="stats"><p>POW</p><div class="stats-number">${p.pow}</div></div>
        </div>
        <hr>
        <p>Armamento</p>
        <p>Nenhum</p>
    `;
    document.getElementById('grid').appendChild(personagem);
}