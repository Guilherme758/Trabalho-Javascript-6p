const form = document.getElementById('form-aplicacao-vacinas')

//Formulario
const paciente = document.getElementById('nome-paciente')
const aplicador = document.getElementById('nome-aplicador')
const data = document.getElementById('data-vacinacao')
const tipoVacina = document.getElementById('tipo-vacina')

form.addEventListener("submit", function (event) {
    event.preventDefault()
    const tabelaVacinadosBody = document.querySelector('#tabela-dos-vacinados tbody')
    const hoje = new Date(`${data.value} 03:00:00`).toLocaleDateString()

    const linha = tabelaVacinadosBody.insertRow()
    linha.innerHTML = `
        <td class="text-center">${paciente.value}</td>
        <td class="text-center">${aplicador.value}</td>
        <td class="text-center">${hoje}</td>
        <td class="text-center">${tipoVacina.value}</td>
    `
    tabelaVacinadosBody.appendChild(linha)

    alert("Dados Salvos!");

    // Limpa os inputs após inserção
    paciente.value = ''
    aplicador.value = ''
    data.value = ''
    tipoVacina.value = ''

})