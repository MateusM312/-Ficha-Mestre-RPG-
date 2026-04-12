
// Corrigido: setInterval (não setIntervalPersonagem/setIntervalInimigo)
setInterval(() => {
    const quantidade = document.querySelectorAll('.card-personagem').length;
    document.getElementById('contador-jogadores').textContent = quantidade;
}, 500);

setInterval(() => {
    const quantidade = document.querySelectorAll('.card-inimigo').length;
    document.getElementById('contador-inimigo').textContent = quantidade;
}, 500);


function editar(elemento){
    const valorAtual = elemento.textContent;
    const input = document.createElement('input');
    input.value = valorAtual;
    input.className = elemento.className;

    input.onblur = () =>{
        elemento.textContent = input.value || valorAtual;
        input.replaceWith(elemento);
    };

    input.onkeydown = (e) => {
        if (e.key === "Enter") input.blur();
    };

    elemento.replaceWith(input);
    input.focus();
    input.select();
}

function abrirForm() {
    const form = document.getElementById('form-personagem');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function abrirFormInimigo(){
    const form = document.getElementById('form-inimigo');
    // A linha de baixo é como se fosse um if.
    // if forme.style.display == none entao mude para block se nao coloque none novamente
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function criarInimigos() {
    const nome  = document.getElementById('inp-nome-ini').value || 'Sem nome';
    const raca  = document.getElementById('inp-raca').value || 'Sem raça';
    const arma  = document.getElementById('inp-arma-ini').value || 'Sem arma';
    const dano  = document.getElementById('inp-dano-ini').value || 0;
    const vida  = document.getElementById('inp-vida-ini').value || 0;
    const mana  = document.getElementById('inp-mana-ini').value || 0;
    const vigor = document.getElementById('inp-vigor-ini').value || 0;

    const iniciais = nome.slice(0, 2).toUpperCase();

    const card = document.createElement('div');
    card.className = 'card-inimigo';
    card.innerHTML = `
        <div class="card-topo">
            <div class="avatar-inimigo">${iniciais}</div>
            <div>
                <p class="card-nome">${nome}</p>
                <p class="card-raca">${raca}</p>
            </div>
            <div class="arma-delete">
                <span class="card-arma">${arma} · ${dano} dano</span>
                <i class="fa-solid fa-circle-minus" id="deletefont" onclick="deletar(this)"></i>
            </div>
        </div>
        <div class="card-barras">
            <div class="barra-item">
                <p>Vida</p>
                <div class="barra-bg"><div class="barra-fill vida" style="width:${vida}%"></div></div>
            </div>
            <div class="barra-item">
                <p>Mana</p>
                <div class="barra-bg"><div class="barra-fill mana" style="width:${mana}%"></div></div>
            </div>
            <div class="barra-item">
                <p>Vigor</p>
                <div class="barra-bg"><div class="barra-fill vigor" style="width:${vigor}%"></div></div>
            </div>
        </div>
    `;

    document.getElementById('lista-inimigos').appendChild(card);
    document.getElementById('form-inimigo').style.display = 'none';
        ['inp-nome-ini', 'inp-raca', 'inp-arma-ini', 'inp-dano-ini', 'inp-vida-ini', 'inp-mana-ini', 'inp-vigor-ini']
    .forEach(id => document.getElementById(id).value = '');
}

function criarPersonagem() {
    const nome  = document.getElementById('inp-nome').value || 'Sem nome';
    const prof  = document.getElementById('inp-prof').value || 'Sem profissão';
    const arma  = document.getElementById('inp-arma').value || 'Sem arma';
    const dano  = document.getElementById('inp-dano').value || 0;
    const vida  = document.getElementById('inp-vida').value || 0;
    const mana  = document.getElementById('inp-mana').value || 0;
    const vigor = document.getElementById('inp-vigor').value || 0;

    const iniciais = nome.slice(0, 2).toUpperCase();

    const card = document.createElement('div');
    card.className = 'card-personagem';
    card.innerHTML = `
        <div class="card-topo">
            <div class="avatar">${iniciais}</div>
            <div>
                <p class="card-nome">${nome}</p>
                <p class="card-prof">${prof}</p>
            </div>
            <div class="arma-delete">
                <span class="card-arma">${arma} · ${dano} dano</span>
                <i class="fa-solid fa-circle-minus" id="deletefont" onclick="deletar(this)"></i>
            </div>
        </div>
        <div class="card-barras">
            <div class="barra-item">
                <p>Vida</p>
                <div class="barra-bg"><div class="barra-fill vida" style="width:${vida}%"></div></div>
            </div>
            <div class="barra-item">
                <p>Mana</p>
                <div class="barra-bg"><div class="barra-fill mana" style="width:${mana}%"></div></div>
            </div>
            <div class="barra-item">
                <p>Vigor</p>
                <div class="barra-bg"><div class="barra-fill vigor" style="width:${vigor}%"></div></div>
            </div>
        </div>
    `;

    document.getElementById('lista-personagens').appendChild(card);
    document.getElementById('form-personagem').style.display = 'none';
    ['inp-nome', 'inp-prof', 'inp-arma', 'inp-dano', 'inp-vida', 'inp-mana', 'inp-vigor']
    .forEach(id => document.getElementById(id).value = '');
}

// Deleta Inimigo/Personagem
function deletar(botao) {
    const card = botao.closest('.card-personagem, .card-inimigo');
    card.remove();
}

function dropdown(){
    document.getElementById("myDropdown").classList.toggle("show");
    event.stopPropagation(); // <- impede o clique de propagar para o window
}

window.onclick = function(event) {
  if (!event.target.matches('.dropdownbnt')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}