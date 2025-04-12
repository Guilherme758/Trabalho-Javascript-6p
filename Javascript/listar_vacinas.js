// Variáveis globais
const modalBody = document.querySelector('#modal-vacina .modal-body');
const modal = document.getElementById('modal-vacina');
const buttonAtualizarvacina = document.getElementById('btn-atualizar-vacina')
const formSubmitAtualizarvacina = document.querySelector('#modal-vacina .modal-footer form')
const tbodyvacinas = document.querySelector('#tabela-vacinas > tbody')
var idVacina = ''

function getVacinas(){
    const response = fetch("http://localhost:3000/vacinas")
    return response
}

function getVacinaById(id){
    const response = fetch(`http://localhost:3000/vacinas/${id}`)
    return response
}

function deleteVacina(id){
    const response = fetch(`http://localhost:3000/vacinas/${id}`, {
        "method": "DELETE"
    })
    return response
}

function updateVacina(id, data){
    const response = fetch(`http://localhost:3000/vacinas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            Nome: data.Nome, 
            Descricao: data.Descricao, 
            Obrigatoria: data.Obrigatoria
        })
    })

    return response
}

// Bloco responsável for fazer a lógica do botão de exclusão (Excluir a linha do registro)
function botoesDeExcluir() {
    const botoesExcluir = document.getElementsByClassName('btn-excluir')
    const arrayBotoesExcluir = Array.from(botoesExcluir)

    arrayBotoesExcluir.forEach(function (botaoExcluir) {
        botaoExcluir.addEventListener('click', function (event) {
            var resposta = window.confirm("Deseja realmente excluir a vacina?"); // Retorna true caso clique em ok ou false caso clique em cancelar
            if (resposta == true) {
                var vacinaRemovida = event.target.closest("tr").getAttribute('id')

                // Remove a vacina da API
                deleteVacina(vacinaRemovida)
                .then(response => {
                    if(response.status == 200){
                        event.target.closest("tr").remove()
                    }
                    else{
                        alert("Erro ao deletar a vacina!")
                    }
                })
                .catch(response => {
                    alert("Erro ao deletar a vacina!")
                })
            }
        })
    })
}

// Bloco responsável for fazer a lógica do botão de visualizar
function botoesDeVisualizar() {
    const botoesVisualizar = document.getElementsByClassName('btn-visualizar')
    const arrayBotoesVisualizar = Array.from(botoesVisualizar)

    arrayBotoesVisualizar.forEach(function (botaoVisualizar) {
        botaoVisualizar.addEventListener('click', function (event) {
            const vacina = event.target.closest("tr").getAttribute('id')

            getVacinaById(vacina)
            .then(response => {
                if(response.status == 200){
                    response.json().then(vacina => {
                        modalBody.innerHTML = ''

                        const pNome = document.createElement('p')
                        pNome.innerText = `Nome: ${vacina.Nome}`
                        modalBody.appendChild(pNome)

                        const pDescricao = document.createElement('p')
                        pDescricao.innerText = `Descrição: ${vacina.Descricao}`
                        modalBody.appendChild(pDescricao)

                        const pObrigatoria = document.createElement('p')
                        pObrigatoria.innerText = `Obrigatória: ${vacina.Obrigatoria}`
                        modalBody.appendChild(pObrigatoria)

                        // Abre o modal
                        modal.classList.add('show');
                        modal.style.display = 'block';

                        // Esconde o botão de atualizar funcionário
                        buttonAtualizarvacina.setAttribute('hidden', '')
                    })
                }
                else{
                    alert("Erro ao visualizar os dados!")
                }
            })
            .catch(response => {
                alert("Erro ao visualizar os dados!")
            })
        })
    })
}

// Bloco responsável por fazer a lógica da edição dos dados da vacina
function botoesDeEditar() {
    const botoesEditar = document.getElementsByClassName('btn-editar')
    const arrayBotoesEditar = Array.from(botoesEditar)

    // Bloco responsável por fazer a lógica da edição dos dados da vaci
    arrayBotoesEditar.forEach(function (botaoEditar) {
        botaoEditar.addEventListener('click', function (event) {
            modalBody.innerHTML = ''

            const form = document.createElement('form')

            const divNome = document.createElement('div')
            divNome.classList.add('mb-3', 'mx-3')
            const labelNome = document.createElement('label')
            labelNome.setAttribute('for', 'nome')
            labelNome.classList.add('form-label')
            labelNome.innerText = "Nome"
            const inputNome = document.createElement('input')
            inputNome.setAttribute('type', 'text')
            inputNome.classList.add('form-control')
            inputNome.setAttribute('id', 'nome')
            inputNome.setAttribute('placeholder', 'Digite o nome da vacina')
            inputNome.required = true
            divNome.appendChild(labelNome)
            divNome.appendChild(inputNome)
            form.appendChild(divNome)

            const divDescricao = document.createElement('div')
            divDescricao.classList.add('mb-3', 'mx-3')
            const labelDescricao = document.createElement('label')
            labelDescricao.setAttribute('for', 'descricao')
            labelDescricao.classList.add('form-label')
            labelDescricao.innerText = "Descrição"
            const inputDescricao = document.createElement('input')
            inputDescricao.setAttribute('type', 'text')
            inputDescricao.classList.add('form-control')
            inputDescricao.setAttribute('id', 'descricao')
            inputDescricao.setAttribute('placeholder', 'Digite a descrição da vacina')
            inputDescricao.required = true
            divDescricao.appendChild(labelDescricao)
            divDescricao.appendChild(inputDescricao)
            form.appendChild(divDescricao)

            const divObrigatoria = document.createElement('div')
            divObrigatoria.classList.add('mb-3', 'mx-3')
            const labelObrigatoria = document.createElement('label')
            labelObrigatoria.setAttribute('for', 'obrigatoria')
            labelObrigatoria.classList.add('form-label')
            labelObrigatoria.innerText = "Obrigatória"
            const selectObrigatoria = document.createElement('select')
            selectObrigatoria.classList.add('form-select')
            selectObrigatoria.setAttribute('id', 'obrigatoria')
            selectObrigatoria.required = true
            const optionDefault = document.createElement('option')
            optionDefault.selected = true
            optionDefault.disabled = true
            optionDefault.innerText = "Escolha uma opção"
            selectObrigatoria.appendChild(optionDefault)
            const optionSim = document.createElement('option')
            optionSim.innerText = 'Sim'
            selectObrigatoria.appendChild(optionSim)
            const optionNao = document.createElement('option')
            optionNao.innerText = 'Não'
            selectObrigatoria.appendChild(optionNao)
            divObrigatoria.appendChild(labelObrigatoria)
            divObrigatoria.appendChild(selectObrigatoria)
            form.appendChild(divObrigatoria)

            modalBody.appendChild(form)

            // Pega o id da vacina que vai ser editado antes de abrir o modal
            idVacina = event.target.closest("tr").getAttribute('id')

            // Mostra o modal
            modal.classList.add('show');
            modal.style.display = 'block';

            // Mostra o botão de atualuzar a vacina
            buttonAtualizarvacina.removeAttribute('hidden')
        })
    })
}

// Insere todos as vacinas chumbados na tabela e cria também os botôes de Visualizar, Editar e Excluir
function criaTabelaVacinas(ids = null) {
    getVacinas().then(response => response.json()).then(vacinas => {
        tbodyvacinas.innerHTML = ''
        vacinas.forEach(function(vacina){
            if(ids != null && !ids.includes(vacina.id)){
                return
            }
            const linha = tbodyvacinas.insertRow()
            linha.setAttribute('id', vacina.id)

            const tdNome = document.createElement('td')
            tdNome.setAttribute("tipo", "nome")
            tdNome.classList.add("text-center")
            tdNome.textContent = vacina.Nome
            linha.appendChild(tdNome)

            const tdDescricao = document.createElement('td')
            tdDescricao.setAttribute("tipo", "descricao")
            tdDescricao.classList.add("text-center")
            tdDescricao.textContent = vacina.Descricao
            linha.appendChild(tdDescricao)

            const tdObrigatoria = document.createElement('td')
            tdObrigatoria.setAttribute("tipo", "obrigatoria")
            tdObrigatoria.classList.add("text-center")
            tdObrigatoria.textContent = vacina.Obrigatoria
            linha.appendChild(tdObrigatoria)

            const tdButtons = document.createElement('td')
            tdButtons.classList.add("text-center")

            const buttonVisualizar = document.createElement('button')
            buttonVisualizar.setAttribute("type", "button")
            buttonVisualizar.classList.add('btn', 'btn-sm', 'btn-success', 'btn-visualizar')
            buttonVisualizar.setAttribute("title", "Visualizar")
            const imageVisualizar = document.createElement('img')
            imageVisualizar.setAttribute('src', '../Icons/icon-visualizar.svg')
            imageVisualizar.setAttribute('width', '20')
            imageVisualizar.setAttribute('height', '20')
            buttonVisualizar.appendChild(imageVisualizar)

            const buttonEditar = document.createElement('button')
            buttonEditar.setAttribute("type", "button")
            buttonEditar.classList.add('btn', 'btn-sm', 'btn-primary', 'btn-editar')
            buttonEditar.setAttribute("title", "Editar")
            const imageEditar = document.createElement('img')
            imageEditar.setAttribute('src', '../Icons/icon-editar.svg')
            imageEditar.setAttribute('width', '20')
            imageEditar.setAttribute('height', '20')
            buttonEditar.appendChild(imageEditar)

            const buttonExcluir = document.createElement('button')
            buttonExcluir.setAttribute("type", "button")
            buttonExcluir.classList.add('btn', 'btn-sm', 'btn-danger', 'btn-excluir')
            buttonExcluir.setAttribute("title", "Excluir")
            const imageExcluir = document.createElement('img')
            imageExcluir.setAttribute('src', '../Icons/icon-excluir.svg')
            imageExcluir.setAttribute('width', '20')
            imageExcluir.setAttribute('height', '20')
            buttonExcluir.appendChild(imageExcluir)

            tdButtons.appendChild(buttonVisualizar)
            tdButtons.appendChild(buttonEditar)
            tdButtons.appendChild(buttonExcluir)

            linha.appendChild(tdButtons)

            tbodyvacinas.appendChild(linha)
        })
    
        // Cria os listeners dos botôes recém-criados
        botoesDeExcluir()
        botoesDeEditar()
        botoesDeVisualizar()
    })
}

// Bloco responsável por implementar a lógica da barra e botão de pesquisa
// const botaoFiltrarNome = document.getElementById('btn-filtrar-nome')
const inputFiltrarNome = document.getElementById('input-filtrar-nome')
inputFiltrarNome.addEventListener('change', function (event) {
    const texto = inputFiltrarNome.value.toLowerCase().trimStart().trimEnd()

    getVacinas().then(response => response.json()).then(vacinas => {
        if (texto != '') {
            const vacinasFiltradas = vacinas.filter(function (vacina) {
                if (vacina.Nome.toLowerCase().includes(texto)) {
                    return vacina
                }
            })
            const idsVacinasFiltradas = vacinasFiltradas.map(function(vacina){
                return vacina.id
            })

            console.log(idsVacinasFiltradas)
            tbodyvacinas.innerHTML = ''
            criaTabelaVacinas(idsVacinasFiltradas)
        }
        else {
            tbodyvacinas.innerHTML = ''
            criaTabelaVacinas()
        }
    })
})

// Bloco responsável por fechar o modal de visualização
const botoesFecharModal = document.getElementsByClassName('btn-fechar-modal')
const arrayBotoesFecharModal = Array.from(botoesFecharModal)
arrayBotoesFecharModal.forEach(function (botaoFecharModal) {
    botaoFecharModal.addEventListener('click', function (event) {
        const modal = document.getElementById('modal-vacina');
        modal.style.display = null;
        modal.classList.remove('show');
    })
})

// Bloco responsável por fazer a atualização da Vacina
formSubmitAtualizarvacina.addEventListener('submit', function (event) {
    event.preventDefault() // Impede a página de dar F5 após o submit
    const nome = document.getElementById('nome')
    const descricao = document.getElementById('descricao')
    const obrigatoria = document.getElementById('obrigatoria')
   
    data = {
        "Nome": nome.value,
        "Descricao": descricao.value,
        "Obrigatoria": obrigatoria.value
    }

    updateVacina(idVacina, data).then(
        vacina => {
            criaTabelaVacinas()
        }
    )
})

criaTabelaVacinas()