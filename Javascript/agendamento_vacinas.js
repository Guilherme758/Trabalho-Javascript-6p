const form = document.getElementById('form-aplicacao-vacinas');

const paciente = document.getElementById('nome-paciente');
const aplicador = document.getElementById('nome-aplicador');
const data = document.getElementById('data-agendamento');
const tipoVacina = document.getElementById('tipo-vacina');

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const dataAtual = new Date();
    const dataSelecionada = new Date(`${data.value} 03:00:00`);
    if (dataSelecionada <= dataAtual) {
        alert("Por favor, selecione uma data futura para o agendamento.");
        return;
    }

    const tabelaVacinadosBody = document.querySelector('#tabela-dos-vacinados tbody');

    const linha = tabelaVacinadosBody.insertRow();
    linha.innerHTML = `
        <td class="text-center">${paciente.value}</td>
        <td class="text-center">${aplicador.value}</td>
        <td class="text-center">${dataSelecionada.toLocaleDateString()}</td>
        <td class="text-center">${tipoVacina.value}</td>
    `;
    tabelaVacinadosBody.appendChild(linha);

    alert("Dados Salvos!");

    paciente.value = '';
    aplicador.value = '';
    data.value = '';
    tipoVacina.value = '';
});