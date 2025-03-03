const form = document.getElementById('form-cadastro-funcionarios')

//Formulário
const nome = document.getElementById('nome')
const cpf = document.getElementById('cpf')
const registro = document.getElementById('registro')
const sexo = document.getElementById('sexo')
const datanascimento = document.getElementById('data-nascimento')
const cidade = document.getElementById('cidade')
const email = document.getElementById('email')

form.addEventListener("submit", function(event){
    event.preventDefault() 
    const tabelaFuncionariosBody = document.querySelector('#tabela-funcionarios > tbody')

    const linha = tabelaFuncionariosBody.insertRow()
    linha.innerHTML = `
        <td class="text-center">${nome.value}</td>
        <td class="text-center">${cpf.value}</td>
        <td class="text-center">${registro.value}</td>
        <td class="text-center">${sexo.value}</td>
        <td class="text-center">${datanascimento.value}</td>
        <td class="text-center">${cidade.value}</td>
        <td class="text-center">${email.value}</td>
    `
    tabelaFuncionariosBody.appendChild(linha)

    alert("Funcionário cadastrado");

    // Limpa os inputs após inserção
    nome.value = ''
    cpf.value = ''
    registro.value = ''
    sexo.value = ''
    datanascimento.value = ''
    cidade.value = ''
    email.value = ''
})
