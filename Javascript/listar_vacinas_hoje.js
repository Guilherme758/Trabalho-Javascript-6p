async function getVacinasAgendadasHoje(){
    const hoje = new Date().toJSON().slice(0, 10)
    const response = await fetch(`http://localhost:8001/vacinacoes`)
    const vacinacoes = await response.json()
    return vacinacoes.filter(v => v.data.slice(0, 10) === hoje)
}

function getFuncionarioById(id){
    return fetch(`http://localhost:8001/funcionarios/${id}`)
}

function getVacinaById(id){
    return fetch(`http://localhost:8001/vacinas/${id}`)
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

            getFuncionarioById(vacina.id_paciente)
            .then(response => response.json()).then(Paciente => {
                paciente = `${Paciente.Nome} - ${Paciente.Cpf}`
                console.log(paciente)
                
                getFuncionarioById(vacina.id_aplicador)
                .then(response => response.json()).then(Aplicador => {
                    aplicador = `${Aplicador.Nome} - ${Aplicador.Cpf}`
                    console.log(aplicador)

                    getVacinaById(vacina.id_vacina)
                    .then(response => response.json()).then(tipoVacina => {
                        vacinaAplicada = `${tipoVacina.Nome}`
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
                        tdData.innerText = vacina.data.split('T')[0]
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
