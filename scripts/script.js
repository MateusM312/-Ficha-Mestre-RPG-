let personagemStorage = JSON.parse(localStorage.getItem('personagemStorage')) || [];
let cardEditando = null;
let nomeEditando = null;

function salvarForm() {
    localStorage.setItem('personagemStorage', JSON.stringify(personagemStorage));
}

function abrirForm() {
    cardEditando = null;
    nomeEditando = null;
    limparForm();
    document.querySelector('.btn-criar').textContent = 'Criar Personagem';
    document.getElementById('modal').style.display = 'flex';
}

function fecharForm() {
    document.getElementById('modal').style.display = 'none';
    cardEditando = null;
    nomeEditando = null;
}

function limparForm() {
    document.getElementById("iName").value = '';
    document.getElementById("iDade").value = 18;
    document.getElementById("iocup").value = '';
    document.getElementById("iFor").value = 50;
    document.getElementById("iConst").value = 50;
    document.getElementById("iTam").value = 50;
    document.getElementById("iDes").value = 50;
    document.getElementById("iApar").value = 50;
    document.getElementById("iTen").value = 50;
    document.getElementById("iPower").value = 50;
    document.getElementById("iEduc").value = 50;
    document.getElementById("iSanAt").value = 50;
    document.getElementById("iSanMax").value = 50;
    document.getElementById("iPvAt").value = 10;
    document.getElementById("iPvMax").value = 10;
    document.getElementById("iPmAt").value = 10;
    document.getElementById("iPmMax").value = 10;
}

function preencherForm(p) {
    document.getElementById("iName").value = p.nome;
    document.getElementById("iDade").value = p.idade;
    document.getElementById("iocup").value = p.ocupacao;
    document.getElementById("iFor").value = p.str;
    document.getElementById("iConst").value = p.con;
    document.getElementById("iTam").value = p.siz;
    document.getElementById("iDes").value = p.dex;
    document.getElementById("iApar").value = p.app;
    document.getElementById("iTen").value = p.int;
    document.getElementById("iPower").value = p.pow;
    document.getElementById("iEduc").value = p.edu;
    document.getElementById("iSanAt").value = p.sanAtual;
    document.getElementById("iSanMax").value = p.sanMax;
    document.getElementById("iPvAt").value = p.pvAtual;
    document.getElementById("iPvMax").value = p.pvMax;
    document.getElementById("iPmAt").value = p.pmAtual;
    document.getElementById("iPmMax").value = p.pmMax;
}

function editar(botao) {
    const card = botao.closest('.card');
    const nome = card.querySelector('h1').textContent;
    const p = personagemStorage.find(p => p.nome === nome);
    if (!p) return;

    cardEditando = card;
    nomeEditando = nome;

    preencherForm(p);
    document.querySelector('.btn-criar').textContent = 'Salvar Alterações';
    document.getElementById('modal').style.display = 'flex';
}

function calcPorcentagem(atual, max) {
    if (max <= 0) return 0;
    return Math.min(100, Math.floor((atual / max) * 100));
}

function lerForm() {
    return {
        nome:     document.getElementById("iName").value || "Sem nome",
        idade:    document.getElementById("iDade").value || "Sem idade",
        ocupacao: document.getElementById("iocup").value || "Sem ocupação",
        str:      parseInt(document.getElementById("iFor").value) || 0,
        con:      parseInt(document.getElementById("iConst").value) || 0,
        siz:      parseInt(document.getElementById("iTam").value) || 0,
        dex:      parseInt(document.getElementById("iDes").value) || 0,
        app:      parseInt(document.getElementById("iApar").value) || 0,
        int:      parseInt(document.getElementById("iTen").value) || 0,
        pow:      parseInt(document.getElementById("iPower").value) || 0,
        edu:      parseInt(document.getElementById("iEduc").value) || 0,
        sanAtual: parseInt(document.getElementById("iSanAt").value) || 0,
        sanMax:   parseInt(document.getElementById("iSanMax").value) || 0,
        pvAtual:  parseInt(document.getElementById("iPvAt").value) || 0,
        pvMax:    parseInt(document.getElementById("iPvMax").value) || 0,
        pmAtual:  parseInt(document.getElementById("iPmAt").value) || 0,
        pmMax:    parseInt(document.getElementById("iPmMax").value) || 0,
    };
}

function criarPersonagem() {
    const p = lerForm();
    p.HP  = Math.floor((p.con + p.siz) / 10);
    p.SAN = p.pow * 5;
    p.MP  = Math.floor(p.pow / 5);

    if (cardEditando && nomeEditando) {
        personagemStorage = personagemStorage.map(x => x.nome === nomeEditando ? p : x);
        salvarForm();
        atualizarCard(cardEditando, p);
        fecharForm();
    } else {
        personagemStorage.push(p);
        salvarForm();
        renderizarPersonagem(p);
        fecharForm();
    }
}

function atualizarCard(card, p) {
    card.querySelector('h1').textContent = p.nome;
    card.querySelector('p').innerHTML = `${p.ocupacao} - <label>${p.idade} Anos</label>`;

    const barras = card.querySelectorAll('.up-background-bar');
    const textos = card.querySelectorAll('.background-bar + p');

    barras[0].style.width = `${calcPorcentagem(p.pvAtual, p.pvMax)}%`;
    textos[0].textContent = `${p.pvAtual}/${p.pvMax}`;
    barras[1].style.width = `${calcPorcentagem(p.sanAtual, p.sanMax)}%`;
    textos[1].textContent = `${p.sanAtual}/${p.sanMax}`;
    barras[2].style.width = `${calcPorcentagem(p.pmAtual, p.pmMax)}%`;
    textos[2].textContent = `${p.pmAtual}/${p.pmMax}`;

    const nums = card.querySelectorAll('.stats-number');
    nums[0].textContent = p.str;
    nums[1].textContent = p.dex;
    nums[2].textContent = p.int;
    nums[3].textContent = p.pow;
}

function renderizarPersonagem(p) {
    const personagem = document.createElement('div');
    personagem.className = 'card';
    personagem.innerHTML = `
        <button class="btn-deletar" onclick="deletar(this)" title="Excluir personagem">
            <i class="fa-solid fa-trash"></i>
        </button>
        <button class="btn-editar" onclick="editar(this)" title="Editar personagem">
            <i class="fa-solid fa-pen"></i>
        </button>
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

function deletar(botao) {
    const card = botao.closest('.card');
    const nome = card.querySelector('h1').textContent;
    personagemStorage = personagemStorage.filter(p => p.nome !== nome);
    salvarForm();
    card.remove();
}

window.onload = function() {
    personagemStorage.forEach(p => renderizarPersonagem(p));
}