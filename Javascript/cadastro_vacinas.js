const form = document.getElementById('form-cadastro-vacinas')

//Formulário
const nome = document.getElementById('nome')
const descricao = document.getElementById('descricao')
const obrigatoria = document.getElementById('obrigatoria')

const campos = [
    {
        "Nome": "nome",
        "Tipo": "texto"
    },
    {
        "Nome": "descricao",
        "Tipo": "texto"
    },
    {
        "Nome": "obrigatoria",
        "Tipo": "texto"
    }
]

function validaInputs(){
    let contErros = 0

    campos.forEach(function(campo){
        let input = document.getElementById(campo.Nome)
        let span = document.getElementById(`span-${campo.Nome}`)

        if(campo.Tipo == "texto"){
            if(input.value.trimStart().trimEnd() == ""){
                span.innerText = `${campo.Nome} não pode ser vazio`
                span.style.color = 'red'
                contErros += 1
            }
            else{
                span.innerText = ''
            }
        }
        else if(campo.Tipo == "cpf"){
            let cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/

            if(!cpfRegex.test(input.value)){
                span.innerText = `${campo.Nome} não está no padrão 000.000.000-00`
                span.style.color = 'red'
                contErros += 1
            }
            else{
                span.innerText = ''
            }
        }
        else if(campo.Tipo == "data"){
            let data = new Date(input.value)
            
            if(isNaN(data.getTime())){
                span.innerText = `${campo.Nome} não está no formato correto ou é uma data inválida`
                span.style.color = 'red'
                contErros += 1
            }
            else{
                span.innerText = ''
            }
        }
        else if(campo.Tipo == "email"){
            let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

            if(!regexEmail.test(input.value)){
                span.innerText = `${campo.Nome} não é um email válido`
                span.style.color = 'red'
                contErros += 1
            }
            else{
                span.innerText = ''
            }
        }
    })
    
    if(contErros > 0){
        return false
    }
    else{
        return true
    }
}

function insertVacina(){
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
}

form.addEventListener("submit", function(event){
    event.preventDefault()

    if(validaInputs(campos)){
        insertVacina()
    }
    else{
        alert("Erro ao inserir a vacina. Valide os campos inseridos")
    }
})