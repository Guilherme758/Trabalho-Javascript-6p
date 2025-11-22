import { APIBaseURL } from "./config.js";

async function getVacinasAgendadasHoje(){
    const hoje = new Date().toJSON().slice(0, 10)
    const response = await fetch(`${APIBaseURL}/agendamentos_vacinas`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
    })
    const vacinacoes = await response.json()
    return vacinacoes.filter(v => v.data_agendada.slice(0, 10) === hoje)
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

// Insere todos as vacinas chumbadas de hoje na tabela
function criaTabelaVacinas() {
    getVacinasAgendadasHoje().then(vacinas_agendadas => {
        vacinas_agendadas.forEach(function(vacina){
            let paciente;
            let aplicador;
            let vacinaAplicada;

            getFuncionarioById(vacina.paciente_id)
            .then(response => response.json()).then(Paciente => {
                paciente = `${Paciente.nome} - ${Paciente.cpf}`
                console.log(paciente)
                
                getFuncionarioById(vacina.aplicador_id)
                .then(response => response.json()).then(Aplicador => {
                    aplicador = `${Aplicador.nome} - ${Aplicador.cpf}`
                    console.log(aplicador)

                    getVacinaById(vacina.vacina_id)
                    .then(response => response.json()).then(tipoVacina => {
                        vacinaAplicada = `${tipoVacina.nome}`
                        console.log(vacinaAplicada)

                        const linha = tbodyvacinas.insertRow();

                        const tdPaciente = document.createElement('td')
                        tdPaciente.classList.add('text-center')
                        tdPaciente.innerText = paciente
                        linha.appendChild(tdPaciente)

                        const tdAplicador = document.createElement('td')
                        tdAplicador.classList.add('text-center')
                        tdAplicador.innerText = aplicador
                        linha.appendChild(tdAplicador)

                        const tdData = document.createElement('td')
                        tdData.classList.add('text-center')
                        tdData.innerText = vacina.data_agendada.split('T')[0]
                        linha.appendChild(tdData)

                        const tdTipoVacina = document.createElement('td')
                        tdTipoVacina.classList.add('text-center')
                        tdTipoVacina.innerText = vacinaAplicada
                        linha.appendChild(tdTipoVacina)

                        tbodyvacinas.appendChild(linha)
                    })
                })
            })
        })
    })
}

criaTabelaVacinas()
