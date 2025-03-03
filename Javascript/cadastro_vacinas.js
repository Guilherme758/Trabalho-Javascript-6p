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
        <td class="text-center">${nome.value}</td>
        <td class="text-center">${descricao.value}</td>
        <td class="text-center">${obrigatoria.value}</td>
    `
    tabelaFuncionariosBody.appendChild(linha)

    alert("Vacina cadastrada!");

    // Limpa os inputs após inserção
    nome.value = ''
    descricao.value = ''
    obrigatoria.value = ''
})