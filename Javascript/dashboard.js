import { APIBaseURL } from "./config.js";

function atualizarFuncionariosCadastrados() {
    fetch(`${APIBaseURL}/funcionarios`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("funcionariosCadastrados").textContent = data.length || 0;
    })
    .catch(error => console.error("Erro ao buscar os dados:", error));
}

function atualizarVacinacoes() {
    fetch(`${APIBaseURL}/vacinacoes`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("vacinasAplicadas").textContent = data.length || 0;
    })
    .catch(error => console.error("Erro ao buscar os dados:", error));
}

function atualizarFuncionariosVacinados() {
    fetch(`${APIBaseURL}/vacinacoes`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
    })
    .then(response => response.json())
    .then(data => {
        let distinctIds = []
        data.forEach(function(vacinacao){
            if(!distinctIds.includes(vacinacao.id_paciente)){
                distinctIds.push(vacinacao.id_paciente)
            }
        })
        document.getElementById("funcionariosVacinados").textContent = distinctIds.length || 0;
    })
    .catch(error => console.error("Erro ao buscar os dados:", error));
}

function atualizarVacinasAgendadas() {
    fetch(`${APIBaseURL}/agendamentos_vacinas`, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
    })
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