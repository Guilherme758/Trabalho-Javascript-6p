function getVacinasAgendadasHoje(){
    const hoje = new Date().toJSON().slice(0, 10)
    return fetch(`http://localhost:3000/vacinas_agendadas?Data=${hoje}`)
}

function getFuncionarioById(id){
    return fetch(`http://localhost:3000/funcionarios/${id}`)
}

function getVacinaById(id){
    return fetch(`http://localhost:3000/vacinas/${id}`)
}

// Variáveis globais
const tbodyvacinas = document.querySelector('#tabela-vacinas > tbody')

// Insere todos as vacinas chumbadas de hoje na tabela
function criaTabelaVacinas() {
    getVacinasAgendadasHoje().then(response => response.json()).then(vacinas_agendadas => {
        vacinas_agendadas.forEach(function(vacina){
            let paciente;
            let aplicador;
            let vacinaAplicada;

            getFuncionarioById(vacina.Paciente)
            .then(response => response.json()).then(Paciente => {
                paciente = `${Paciente.Nome} - ${Paciente.Cpf}`
                console.log(paciente)
                
                getFuncionarioById(vacina.Aplicador)
                .then(response => response.json()).then(Aplicador => {
                    aplicador = `${Aplicador.Nome} - ${Aplicador.Cpf}`
                    console.log(aplicador)

                    getVacinaById(vacina.TipoVacina)
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
                        tdData.innerText = vacina.Data
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