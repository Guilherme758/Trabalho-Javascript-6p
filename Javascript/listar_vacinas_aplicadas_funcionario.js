var funcionarios = ["Pedro", "Maria", "Ana"]

var vacinas = [
    {
        "FuncionarioVacinado": "Pedro",
        "FuncionarioResponsavel": "Ana",
        "DataAplicacao": "2025-03-20 03:00:00",
        "TipoVacina": "Vacina A"
    },
    {
        "FuncionarioVacinado": "Maria",
        "FuncionarioResponsavel": "Pedro",
        "DataAplicacao": "2025-03-20 03:00:00",
        "TipoVacina": "Vacina B"
    },
    {
        "FuncionarioVacinado": "Ana",
        "FuncionarioResponsavel": "Maria",
        "DataAplicacao": "2025-03-21 03:00:00",
        "TipoVacina": "BCG"
    },
    {
        "FuncionarioVacinado": "Ana",
        "FuncionarioResponsavel": "Maria",
        "DataAplicacao": "2025-03-19 03:00:00",
        "TipoVacina": "Covid-19"
    }
]

// Variáveis globais
const tbodyvacinas = document.querySelector('#tabela-vacinas > tbody')
const hoje = new Date().toLocaleDateString()
const selectFuncionario = document.querySelector("#funcionario")

// Insere todos as vacinas chumbadas de hoje na tabela
function criaTabelaVacinas(funcionario, vacinas) {
    let vacinasFuncionario = vacinas.filter(function(vacina){
        if(vacina.FuncionarioVacinado == funcionario){
            return vacina
        }
    })

    vacinasFuncionario.forEach(function(vacina){
        const linha = tbodyvacinas.insertRow();
        linha.innerHTML = `
        <td tipo="funcionario-responsavel" class="text-center">${vacina.FuncionarioResponsavel}</td>
        <td tipo="data-aplicacao" class="text-center">${new Date(vacina.DataAplicacao).toLocaleDateString()}</td>
        <td tipo="tipo-vacina" class="text-center">${vacina.TipoVacina}</td>
        `
        tbodyvacinas.appendChild(linha)
    })
}

// Cria as options do select de acordo com o array de funcionários
funcionarios.forEach(function(funcionario){
    let option = document.createElement('option')
    option.innerText = funcionario

    selectFuncionario.appendChild(option)
})

// Toda vez que um valor do select for selecionado, será trago as vacinas daquele funcionário
selectFuncionario.addEventListener('change', function(event){
    tbodyvacinas.innerHTML = ''

    let nomeFuncionario = selectFuncionario.value
    
    criaTabelaVacinas(nomeFuncionario, vacinas)
})