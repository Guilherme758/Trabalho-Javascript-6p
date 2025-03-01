const form = document.getElementById('form-cadastro-funcionarios')

//Formulário
const nome = document.getElementById('nome')
const cpf = document.getElementById('cpf')
const registro = document.getElementById('registro')
const sexo = document.getElementById('sexo')
const datanasciemnto = document.getElementById('data-nascimento')
const cidade = document.getElementById('cidade')
const email = document.getElementById('email')

form.addEventListener("submit", function(event){
    event.preventDefault() 
    const tabelaFuncionariosBody = document.querySelector('#tabela-funcionarios > tbody')

    const linha = tabelaFuncionariosBody.insertRow()
    linha.innerHTML = `
        <td>${nome.value}</td>
        <td>${cpf.value}</td>
        <td>${registro.value}</td>
        <td>${sexo.value}</td>
        <td>${datanasciemnto.value}</td>
        <td>${cidade.value}</td>
        <td>${email.value}</td>
    `
    tabelaFuncionariosBody.appendChild(linha)

    alert("Funcionário cadastrado");
})
