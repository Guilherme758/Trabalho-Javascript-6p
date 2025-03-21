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

// Insere todos as vacinas chumbadas de hoje na tabela
function criaTabelaVacinas(vacinas) {
    vacinas.forEach(function (vacina) {
        let dataAplicacao = new Date(vacina.DataAplicacao).toLocaleDateString()
        if(dataAplicacao == hoje){
            const linha = tbodyvacinas.insertRow();
            linha.innerHTML = `
            <td tipo="funcionario-vacinado" class="text-center">${vacina.FuncionarioVacinado}</td>
            <td tipo="funcionario-responsavel" class="text-center">${vacina.FuncionarioResponsavel}</td>
            <td tipo="data-aplicacao" class="text-center">${dataAplicacao}</td>
            <td tipo="tipo-vacina" class="text-center">${vacina.TipoVacina}</td>
            `
            tbodyvacinas.appendChild(linha)
        }
    })
}

criaTabelaVacinas(vacinas)