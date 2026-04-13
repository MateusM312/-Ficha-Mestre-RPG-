function editar(elemento){
    const valorAtual = elemento.textContent;
    const input = document.createElement('input');
    input.value = valorAtual;
    input.className = elemento.className;

    input.onblur = () => {
        const novoValor = input.value || valorAtual;
        elemento.textContent = novoValor;
        input.replaceWith(elemento);

        // Atualiza iniciais se for o nome
        if (elemento.id === 'player-nome') {
            const iniciais = novoValor.slice(0, 2).toUpperCase();
            document.querySelector('.inicias-mudar').textContent = iniciais;
        }
    };

    input.onkeydown = (e) => {
        if (e.key === "Enter") input.blur();
    };

    // Atualiza em tempo real enquanto digita
    input.oninput = () => {
        if (elemento.id === 'player-nome') {
            const iniciais = (input.value || valorAtual).slice(0, 2).toUpperCase();
            document.querySelector('.inicias-mudar').textContent = iniciais;
        }
    };

    elemento.replaceWith(input);
    input.focus();
    input.select();
}