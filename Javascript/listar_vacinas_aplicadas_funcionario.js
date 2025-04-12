function getVacinacoesByPaciente(id){
    return fetch(`http://localhost:3000/vacinacoes?pacienteId=${id}`)
}

function getFuncionarios(){
    return fetch(`http://localhost:3000/funcionarios`)
}

function getFuncionarioById(id){
    return fetch(`http://localhost:3000/funcionarios/${id}`)
}

function getVacinaById(id){
    return fetch(`http://localhost:3000/vacinas/${id}`)
}

// Variáveis globais
const tbodyvacinas = document.querySelector('#tabela-vacinas > tbody')
const selectFuncionario = document.querySelector("#funcionario")

// Insere todos as vacinas chumbadas de hoje na tabela
function criaTabelaVacinas(idFuncionario) {
    getVacinacoesByPaciente(idFuncionario).then(response => response.json()).then(vacinacoes => {
        vacinacoes.forEach(function(vacinacao){
            getFuncionarioById(vacinacao.aplicadorId).then(response => response.json()).then(aplicador => {
                getVacinaById(vacinacao.vacinaId).then(response => response.json()).then(vacina => {
                    const linha = tbodyvacinas.insertRow();

                    const tdAplicador = document.createElement('td')
                    tdAplicador.classList.add('text-center')
                    tdAplicador.innerText = `${aplicador.Nome} - ${aplicador.Cpf}`
                    linha.appendChild(tdAplicador)

                    const tdData = document.createElement('td')
                    tdData.classList.add('text-center')
                    tdData.innerText = `${vacinacao.data}`
                    linha.appendChild(tdData)

                    const tdVacina = document.createElement('td')
                    tdVacina.classList.add('text-center')
                    tdVacina.innerText = `${vacina.Nome}`
                    linha.appendChild(tdVacina)

                    tbodyvacinas.appendChild(linha)
                })
            })
        })
    })
}

// Cria as options do select de acordo com o array de funcionários

getFuncionarios().then(result => result.json()).then(funcionarios => {
    funcionarios.forEach(function(funcionario){
        const option = document.createElement('option')
        option.value = funcionario.id
        option.innerText = `${funcionario.Nome} - ${funcionario.Cpf}`
        selectFuncionario.appendChild(option)
    })
})

// Toda vez que um valor do select for selecionado, será trago as vacinas daquele funcionário
selectFuncionario.addEventListener('change', function(event){
    tbodyvacinas.innerHTML = ''

    let idFuncionario = selectFuncionario.selectedOptions[0].value
    
    criaTabelaVacinas(idFuncionario)
})