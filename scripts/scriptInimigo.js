let inimigoStorage = JSON.parse(localStorage.getItem('inimigoStorage')) || [];
let cardEditando = null;
let nomeEditando = null;

function salvarForm() {
    localStorage.setItem('inimigoStorage', JSON.stringify(inimigoStorage));
}

function abrirForm() {
    cardEditando = null;
    nomeEditando = null;
    limparForm();
    document.querySelector('.btn-criar').textContent = 'Criar Monstro';
    document.getElementById('modal').style.display = 'flex';
}

function fecharForm() {
    document.getElementById('modal').style.display = 'none';
    cardEditando = null;
    nomeEditando = null;
}

function limparForm() {
    document.getElementById("iName").value = '';
    document.getElementById("iocup").value = '';
    document.getElementById("iFor").value = 50;
    document.getElementById("iConst").value = 50;
    document.getElementById("iTam").value = 50;
    document.getElementById("iDes").value = 50;
    document.getElementById("iTen").value = 50;
    document.getElementById("iPower").value = 50;
    document.getElementById("iPvAt").value = 10;
    document.getElementById("iPvMax").value = 10;
    document.getElementById("iArmadura").value = 0;
    document.getElementById("iSanLoss").value = '';
    document.getElementById("ihist").value = '';
    document.getElementById("lista-armamentos").innerHTML = '';
    document.getElementById("lista-itens").innerHTML = '';
}

function preencherForm(p) {
    document.getElementById("iName").value = p.nome;
    document.getElementById("iocup").value = p.tipo;
    document.getElementById("iFor").value = p.str;
    document.getElementById("iConst").value = p.con;
    document.getElementById("iTam").value = p.siz;
    document.getElementById("iDes").value = p.dex;
    document.getElementById("iTen").value = p.int;
    document.getElementById("iPower").value = p.pow;
    document.getElementById("iPvAt").value = p.pvAtual;
    document.getElementById("iPvMax").value = p.pvMax;
    document.getElementById("iArmadura").value = p.armadura;
    document.getElementById("iSanLoss").value = p.sanLoss;
    document.getElementById("ihist").value = p.hist || '';

    const listaArm = document.getElementById('lista-armamentos');
    listaArm.innerHTML = '';
    (p.armamentos || []).forEach(a => listaArm.appendChild(criarLinhaItem('Ex: Garras, Mordida...', a)));

    const listaItens = document.getElementById('lista-itens');
    listaItens.innerHTML = '';
    (p.habilidades || []).forEach(h => listaItens.appendChild(criarLinhaItem('Ex: Invisibilidade, Regeneração...', h)));
}

function criarLinhaItem(placeholder, valor = '') {
    const div = document.createElement('div');
    div.className = 'item-linha';
    div.innerHTML = `
        <input type="text" placeholder="${placeholder}" value="${valor}">
        <button type="button" class="btn-remover" onclick="this.parentElement.remove()">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;
    return div;
}

function adicionarArmamento() {
    document.getElementById('lista-armamentos').appendChild(criarLinhaItem('Ex: Garras, Mordida...'));
}

function adicionarItem() {
    document.getElementById('lista-itens').appendChild(criarLinhaItem('Ex: Invisibilidade, Regeneração...'));
}

function editar(botao) {
    const card = botao.closest('.card');
    const nome = card.querySelector('h1').textContent;
    const p = inimigoStorage.find(p => p.nome === nome);
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
        nome:       document.getElementById("iName").value || "Sem nome",
        tipo:       document.getElementById("iocup").value || "Sem tipo",
        str:        parseInt(document.getElementById("iFor").value) || 0,
        con:        parseInt(document.getElementById("iConst").value) || 0,
        siz:        parseInt(document.getElementById("iTam").value) || 0,
        dex:        parseInt(document.getElementById("iDes").value) || 0,
        int:        parseInt(document.getElementById("iTen").value) || 0,
        pow:        parseInt(document.getElementById("iPower").value) || 0,
        pvAtual:    parseInt(document.getElementById("iPvAt").value) || 0,
        pvMax:      parseInt(document.getElementById("iPvMax").value) || 0,
        armadura:   parseInt(document.getElementById("iArmadura").value) || 0,
        sanLoss:    document.getElementById("iSanLoss").value || '0',
        hist:       document.getElementById("ihist").value || '',
        armamentos: [...document.querySelectorAll('#lista-armamentos input')].map(i => i.value).filter(v => v.trim() !== ''),
        habilidades:[...document.querySelectorAll('#lista-itens input')].map(i => i.value).filter(v => v.trim() !== ''),
    };
}

function criarPersonagem() {
    const p = lerForm();
    p.HP = Math.floor((p.con + p.siz) / 10);

    if (cardEditando && nomeEditando) {
        inimigoStorage = inimigoStorage.map(x => x.nome === nomeEditando ? p : x);
        salvarForm();
        atualizarCard(cardEditando, p);
        fecharForm();
    } else {
        inimigoStorage.push(p);
        salvarForm();
        renderizarPersonagem(p);
        fecharForm();
    }
    alert("Inimigo criado com sucesso!")
}

function atualizarCard(card, p) {
    card.querySelector('h1').textContent = p.nome;
    card.querySelector('p').innerHTML = `${p.tipo}`;

    const barras = card.querySelectorAll('.up-background-bar');
    const textos = card.querySelectorAll('.background-bar + p');
    barras[0].style.width = `${calcPorcentagem(p.pvAtual, p.pvMax)}%`;
    textos[0].textContent = `${p.pvAtual}/${p.pvMax}`;

    const nums = card.querySelectorAll('.stats-number');
    nums[0].textContent = p.str;
    nums[1].textContent = p.dex;
    nums[2].textContent = p.int;
    nums[3].textContent = p.pow;

    card.querySelector('.card-armamentos').textContent  = p.armamentos?.length   ? p.armamentos.join(', ')   : 'Nenhum';
    card.querySelector('.card-habilidades').textContent = p.habilidades?.length  ? p.habilidades.join(', ')  : 'Nenhuma';
    card.querySelector('.card-armadura').textContent    = p.armadura;
    card.querySelector('.card-sanloss').textContent     = p.sanLoss;
}

function renderizarPersonagem(p) {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `
        <button class="btn-deletar" onclick="deletar(this)" title="Excluir">
            <i class="fa-solid fa-trash"></i>
        </button>
        <button class="btn-editar" onclick="editar(this)" title="Editar">
            <i class="fa-solid fa-pen"></i>
        </button>
        <h1>${p.nome}</h1>
        <p>${p.tipo}</p>
        <div><i class="fa-regular fa-heart"></i>
            <div class="background-bar">
                <div class="up-background-bar" style="width: ${calcPorcentagem(p.pvAtual, p.pvMax)}%"></div>
            </div>
            <p>${p.pvAtual}/${p.pvMax}</p>
        </div>
        <hr>
        <div>
            <div class="stats"><p>FOR</p><div class="stats-number">${p.str}</div></div>
            <div class="stats"><p>DES</p><div class="stats-number">${p.dex}</div></div>
            <div class="stats"><p>INT</p><div class="stats-number">${p.int}</div></div>
            <div class="stats"><p>POW</p><div class="stats-number">${p.pow}</div></div>
        </div>
        <hr>
        <p class="card-label">Armadura</p>
        <p class="card-armadura">${p.armadura}</p>
        <p class="card-label">Perda de SAN</p>
        <p class="card-sanloss">${p.sanLoss || '0'}</p>
        <p class="card-label">Armamento</p>
        <p class="card-armamentos">${p.armamentos?.length ? p.armamentos.join(', ') : 'Nenhum'}</p>
        <p class="card-label">Habilidades</p>
        <p class="card-habilidades">${p.habilidades?.length ? p.habilidades.join(', ') : 'Nenhuma'}</p>
    `;
    document.getElementById('grid').appendChild(el);
}

function deletar(botao) {
    const card = botao.closest('.card');
    const nome = card.querySelector('h1').textContent;
    inimigoStorage = inimigoStorage.filter(p => p.nome !== nome);
    salvarForm();
    card.remove();
}

window.onload = function() {
    inimigoStorage.forEach(p => renderizarPersonagem(p));
}