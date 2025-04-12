// Funcionários "chumbados"
/*var funcionarios = [
    {
        "Nome": "Pedro",
        "Cpf": "000.000.000-01",
        "Registro": "123",
        "Sexo": "Masculino",
        "DataNascimento": "14/01/2000",
        "Cidade": "São Paulo",
        "Email": "pedro@gmail.com"
    },
    {
        "Nome": "Ana",
        "Cpf": "000.000.000-02",
        "Registro": "456",
        "Sexo": "Feminino",
        "DataNascimento": "27/02/2003",
        "Cidade": "Pouso Alegre",
        "Email": "Ana@gmail.com"
    },
    {
        "Nome": "Maria",
        "Cpf": "000.000.000-03",
        "Registro": "789",
        "Sexo": "Feminino",
        "DataNascimento": "09/12/1995",
        "Cidade": "Rio de Janeiro",
        "Email": "maria@gmail.com"
    }
]*/

// Variáveis globais
const modalBody = document.querySelector('#modal-funcionario .modal-body');
const modal = document.getElementById('modal-funcionario');
const buttonAtualizarFuncionario = document.getElementById('btn-atualizar-funcionario')
const formSubmitAtualizarFuncionario = document.querySelector('#modal-funcionario .modal-footer form')
const tbodyFuncionarios = document.querySelector('#tabela-funcionarios > tbody')
var idFuncionario = ''

async function getFuncionarios(){
    const response = await fetch("http://localhost:3000/funcionarios")
    return await response.json()
}

function getFuncionarioById(id){
    const response = fetch(`http://localhost:3000/funcionarios/${id}`)
    return response
}

function deleteFuncionario(id){
    const response = fetch(`http://localhost:3000/funcionarios/${id}`, {
        "method": "DELETE"
    })
    return response
}

function updateFuncionario(id, data){
    const response = fetch(`http://localhost:3000/funcionarios/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            Nome: data.Nome, 
            Registro: data.Registro, 
            Cidade: data.Cidade, 
            Email: data.Email
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
            var resposta = window.confirm("Deseja realmente excluir o usuário?"); // Retorna true caso clique em ok ou false caso clique em cancelar
            if (resposta == true) {
                var idRemovido = event.target.closest("tr").getAttribute('id')

                // Remove o funcionário da API
                deleteFuncionario(idRemovido)
                .then(response => {
                    if(response.status == 200){
                        event.target.closest("tr").remove() // Remove a linha
                    }
                    else{
                        alert("Erro ao deletar o funcionário!")
                    }
                })
                .catch(response => {
                    alert("Erro ao deletar o funcionário!")
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
            const idFuncionario = event.target.closest("tr").getAttribute('id');
            
            getFuncionarioById(idFuncionario)
            .then(response => {
                if (response.status == 200){
                    response.json().then(funcionario => {
                        modalBody.innerHTML = ''
                        
                        const pNome = document.createElement('p')
                        pNome.innerText = `Nome: ${funcionario.Nome}`
                        modalBody.appendChild(pNome)

                        const pCpf = document.createElement('p')
                        pCpf.innerText = `CPF: ${funcionario.Cpf}`
                        modalBody.appendChild(pCpf)

                        const pRegistro = document.createElement('p')
                        pRegistro.innerText = `Registro: ${funcionario.Registro}`
                        modalBody.appendChild(pRegistro)

                        const pSexo = document.createElement('p')
                        pSexo.innerText = `Sexo: ${funcionario.Sexo}`
                        modalBody.appendChild(pSexo)

                        const pDataNascimento = document.createElement('p')
                        pDataNascimento.innerText = `Data Nascimento: ${funcionario.DataNascimento}`
                        modalBody.appendChild(pDataNascimento)

                        const pCidade = document.createElement('p')
                        pCidade.innerText = `Cidade: ${funcionario.Cidade}`
                        modalBody.appendChild(pCidade)

                        const pEmail = document.createElement('p')
                        pEmail.innerText = `Email: ${funcionario.Email}`
                        modalBody.appendChild(pEmail)

                        // Abre o modal
                        modal.classList.add('show');
                        modal.style.display = 'block';

                        // Esconde o botão de atualizar funcionário
                        buttonAtualizarFuncionario.setAttribute('hidden', '')
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

// Bloco responsável por fazer a lógica da edição dos dados do funcionário
function botoesDeEditar() {
    const botoesEditar = document.getElementsByClassName('btn-editar')
    const arrayBotoesEditar = Array.from(botoesEditar)

    // Bloco responsável por fazer a lógica da edição dos dados do funcionário
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
            inputNome.setAttribute('placeholder', 'Digite Seu nome')
            inputNome.required = true
            divNome.appendChild(labelNome)
            divNome.appendChild(inputNome)
            form.appendChild(divNome)

            const divRegistro = document.createElement('div')
            divRegistro.classList.add('mb-3', 'mx-3')
            const labelRegistro = document.createElement('label')
            labelRegistro.setAttribute('for', 'registro')
            labelRegistro.classList.add('form-label')
            labelRegistro.innerText = "Registro"
            const inputRegistro = document.createElement('input')
            inputRegistro.setAttribute('type', 'text')
            inputRegistro.classList.add('form-control')
            inputRegistro.setAttribute('id', 'registro')
            inputRegistro.setAttribute('placeholder', 'Descrição')
            inputRegistro.required = true
            divRegistro.appendChild(labelRegistro)
            divRegistro.appendChild(inputRegistro)
            form.appendChild(divRegistro)

            const divCidade = document.createElement('div')
            divCidade.classList.add('mb-3', 'mx-3')
            const labelCidade = document.createElement('label')
            labelCidade.setAttribute('for', 'cidade')
            labelCidade.classList.add('form-label')
            labelCidade.innerText = "Cidade"
            const inputCidade = document.createElement('input')
            inputCidade.setAttribute('type', 'text')
            inputCidade.classList.add('form-control')
            inputCidade.setAttribute('id', 'cidade')
            inputCidade.setAttribute('placeholder', 'Ex: São Paulo - SP')
            inputCidade.required = true
            divRegistro.appendChild(labelCidade)
            divRegistro.appendChild(inputCidade)
            form.appendChild(divCidade)
            
            const divEmail = document.createElement('div')
            divEmail.classList.add('mb-3', 'mx-3')
            const labelEmail = document.createElement('label')
            labelEmail.setAttribute('for', 'email')
            labelEmail.classList.add('form-label')
            labelEmail.innerText = "Email"
            const inputEmail = document.createElement('input')
            inputEmail.setAttribute('type', 'text')
            inputEmail.classList.add('form-control')
            inputEmail.setAttribute('id', 'email')
            inputEmail.setAttribute('placeholder', 'Exemple@email.com')
            inputEmail.required = true
            divEmail.appendChild(labelEmail)
            divEmail.appendChild(inputEmail)
            form.appendChild(divEmail)

            modalBody.appendChild(form)

            // Pega o id do funcionário que vai ser editado antes de abrir o modal
            idFuncionario = event.target.closest("tr").getAttribute('id')

            // Mostra o modal
            modal.classList.add('show');
            modal.style.display = 'block';

            // Mostra o botão de atualizar funcionário
            buttonAtualizarFuncionario.removeAttribute('hidden')
        })
    })
}

// Insere todos os funcionários chumbados na tabela e cria também os botôes de Visualizar, Editar e Excluir
function criaTabelaFuncionarios(ids = null) {
    getFuncionarios().then(funcionarios => {
        tbodyFuncionarios.innerHTML = ''
        funcionarios.forEach(function(funcionario){
            if(ids != null && !ids.includes(funcionario.id)){
                return
            }

            const linha = tbodyFuncionarios.insertRow()
            linha.setAttribute('id', funcionario.id)

            const tdNome = document.createElement('td')
            tdNome.setAttribute("tipo", "nome")
            tdNome.classList.add("text-center")
            tdNome.textContent = funcionario.Nome
            linha.appendChild(tdNome)

            const tdCpf = document.createElement('td')
            tdCpf.setAttribute("tipo", "cpf")
            tdCpf.classList.add("text-center")
            tdCpf.textContent = funcionario.Cpf
            linha.appendChild(tdCpf)

            const tdRegistro = document.createElement('td')
            tdRegistro.setAttribute("tipo", "registro")
            tdRegistro.classList.add("text-center")
            tdRegistro.textContent = funcionario.Registro
            linha.appendChild(tdRegistro)

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

            tbodyFuncionarios.appendChild(linha)
        })
        botoesDeExcluir()
        botoesDeEditar()
        botoesDeVisualizar()
    })
}

// Bloco responsável por implementar a lógica da barra de pesquisa
// const botaoFiltrarNome = document.getElementById('btn-filtrar-nome')
const inputFiltrarNome = document.getElementById('input-filtrar-nome')
inputFiltrarNome.addEventListener('change', function (event) {
    const texto = inputFiltrarNome.value.toLowerCase().trimStart().trimEnd()

    getFuncionarios().then(funcionarios => {
        if (texto != '') {
            const funcionariosFiltrados = funcionarios.filter(function (funcionario) {
                if (funcionario.Nome.toLowerCase().includes(texto)) {
                    return funcionario.id
                }
            })
            const idsFuncionariosFiltrados = funcionariosFiltrados.map(function(funcionario){
                return funcionario.id
            })

            console.log(idsFuncionariosFiltrados)
            tbodyFuncionarios.innerHTML = ''
            criaTabelaFuncionarios(idsFuncionariosFiltrados)
        }
        else {
            tbodyFuncionarios.innerHTML = ''
            criaTabelaFuncionarios()
        }
    })
})

// Bloco responsável por fechar o modal de visualização
const botoesFecharModal = document.getElementsByClassName('btn-fechar-modal')
const arrayBotoesFecharModal = Array.from(botoesFecharModal)
arrayBotoesFecharModal.forEach(function (botaoFecharModal) {
    botaoFecharModal.addEventListener('click', function (event) {
        const modal = document.getElementById('modal-funcionario');
        modal.style.display = null;
        modal.classList.remove('show');
    })
})

// Bloco responsável por fazer a atualização do funcionário
formSubmitAtualizarFuncionario.addEventListener('submit', function (event) {
    event.preventDefault() // Impede a página de dar F5 após o submit
    const nome = document.getElementById('nome')
    const registro = document.getElementById('registro')
    const cidade = document.getElementById('cidade')
    const email = document.getElementById('email')

    data = {
        "Nome": nome.value,
        "Registro": registro.value,
        "Cidade": cidade.value,
        "Email": email.value
    }

    updateFuncionario(idFuncionario, data).then(
        funcionario => {
            criaTabelaFuncionarios()
        }
    )     
})

const response = getFuncionarios()

criaTabelaFuncionarios()