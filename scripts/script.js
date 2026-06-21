const modal = document.getElementById('modal')
const btnAbrir = document.querySelector('.button-add button')

btnAbrir.onclick = () => modal.style.display = 'flex'
modal.onclick = () => modal.style.display = 'none'
modal.querySelector('.add').onclick = (e) => e.stopPropagation()

function criarPERSONAGEM(){
    const nome = document.getElementById().value
}