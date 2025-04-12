function atualizarFuncionariosCadastrados() {
    fetch("http://localhost:3000/funcionarios")
        .then(response => response.json())
        .then(data => {
            document.getElementById("funcionariosCadastrados").textContent = data.length || 0;
        })
        .catch(error => console.error("Erro ao buscar os dados:", error));
}

function atualizarVacinacoes() {
    fetch("http://localhost:3000/vacinacoes")
        .then(response => response.json())
        .then(data => {
            document.getElementById("vacinasAplicadas").textContent = data.length || 0;
        })
        .catch(error => console.error("Erro ao buscar os dados:", error));
}

function atualizarFuncionariosVacinados() {
    fetch("http://localhost:3000/vacinacoes")
        .then(response => response.json())
        .then(data => {
            let distinctIds = []
            data.forEach(function(vacinacao){
                if(!distinctIds.includes(vacinacao.pacienteId)){
                    distinctIds.push(vacinacao.pacienteId)
                }
            })
            document.getElementById("funcionariosVacinados").textContent = distinctIds.length || 0;
        })
        .catch(error => console.error("Erro ao buscar os dados:", error));
}

function atualizarVacinasAgendadas() {
    fetch("http://localhost:3000/vacinas_agendadas")
        .then(response => response.json())
        .then(data => {
            document.getElementById("vacinasAgendadas").textContent = data.length || 0;
        })
        .catch(error => console.error("Erro ao buscar os dados:", error));
}

atualizarFuncionariosCadastrados()
atualizarVacinacoes()
atualizarFuncionariosVacinados()
atualizarVacinasAgendadas()