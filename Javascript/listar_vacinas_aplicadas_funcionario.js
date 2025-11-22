import { APIBaseURL } from "./config.js";

async function getVacinacoesByPaciente(id){
    const response = await fetch(`${APIBaseURL}/vacinacoes`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
    })
    const vacinacoes = await response.json()
    return vacinacoes.filter(v => v.id_paciente === id)
}

function getFuncionarios(){
    return fetch(`${APIBaseURL}/funcionarios`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
    })
}

function getFuncionarioById(id){
    return fetch(`${APIBaseURL}/funcionarios/${id}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
    })
}

function getVacinaById(id){
    return fetch(`${APIBaseURL}/vacinas/${id}`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
    })
}

// Variáveis globais
const tbodyvacinas = document.querySelector('#tabela-vacinas > tbody')
const selectFuncionario = document.querySelector("#funcionario")

// Insere todos as vacinas chumbadas de hoje na tabela
function criaTabelaVacinas(idFuncionario) {
    getVacinacoesByPaciente(idFuncionario).then(vacinacoes => {
        vacinacoes.forEach(function(vacinacao){
            getFuncionarioById(vacinacao.id_aplicador).then(response => response.json()).then(aplicador => {
                getVacinaById(vacinacao.id_vacina).then(response => response.json()).then(vacina => {
                    const linha = tbodyvacinas.insertRow();

                    const tdAplicador = document.createElement('td')
                    tdAplicador.classList.add('text-center')
                    tdAplicador.innerText = `${aplicador.nome} - ${aplicador.cpf}`
                    linha.appendChild(tdAplicador)

                    const tdData = document.createElement('td')
                    tdData.classList.add('text-center')
                    tdData.innerText = `${vacinacao.data.split('T')[0]}`
                    linha.appendChild(tdData)

                    const tdVacina = document.createElement('td')
                    tdVacina.classList.add('text-center')
                    tdVacina.innerText = `${vacina.nome}`
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
        option.innerText = `${funcionario.nome} - ${funcionario.cpf}`
        selectFuncionario.appendChild(option)
    })
})

// Toda vez que um valor do select for selecionado, será trago as vacinas daquele funcionário
selectFuncionario.addEventListener('change', function(event){
    tbodyvacinas.innerHTML = ''

    let idFuncionario = selectFuncionario.selectedOptions[0].value
    
    criaTabelaVacinas(idFuncionario)
})
