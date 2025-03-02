const form = document.getElementById('form-cadastro-vacinas')

//Formulário
const nome = document.getElementById('nome')
const descricao = document.getElementById('descricao')
const obrigatoria = document.getElementById('obrigatoria')

form.addEventListener("submit", function(event){
    event.preventDefault() 
    const tabelaFuncionariosBody = document.querySelector('#tabela-vacinas > tbody')

    const linha = tabelaFuncionariosBody.insertRow()
    linha.innerHTML = `
        <td>${nome.value}</td>
        <td>${descricao.value}</td>
        <td>${obrigatoria.value}</td>
    `
    tabelaFuncionariosBody.appendChild(linha)

    alert("Vacina cadastrada!");
})