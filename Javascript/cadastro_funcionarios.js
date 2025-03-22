const form = document.getElementById('form-cadastro-funcionarios')

const campos = [
    {
        "Nome": "nome",
        "Tipo": "texto"
    },
    {
        "Nome": "cpf",
        "Tipo": "cpf"
    },
    {
        "Nome": "registro",
        "Tipo": "texto"
    },
    {
        "Nome": "sexo",
        "Tipo": "texto"
    },
    {
        "Nome": "data-nascimento",
        "Tipo": "data"
    },
    {
        "Nome": "cidade",
        "Tipo": "texto"
    },
    {
        "Nome": "email",
        "Tipo": "email"
    },
]

//Formulário
const nome = document.getElementById('nome')
const cpf = document.getElementById('cpf')
const registro = document.getElementById('registro')
const sexo = document.getElementById('sexo')
const dataNascimento = document.getElementById('data-nascimento')
const cidade = document.getElementById('cidade')
const email = document.getElementById('email')

const tabelaFuncionariosBody = document.querySelector('#tabela-funcionarios > tbody')

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

function insertFuncionario(){
    const linha = tabelaFuncionariosBody.insertRow()
    const dataNascimentoFormatada = new Date(`${dataNascimento.value} 03:00:00`).toLocaleDateString()

    linha.innerHTML = `
        <td class="text-center">${nome.value}</td>
        <td class="text-center">${cpf.value}</td>
        <td class="text-center">${registro.value}</td>
        <td class="text-center">${sexo.value}</td>
        <td class="text-center">${dataNascimentoFormatada}</td>
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
    dataNascimento.value = ''
    cidade.value = ''
    email.value = ''
}

form.addEventListener("submit", function(event){
    event.preventDefault() 

    if(validaInputs()){
        insertFuncionario()
    }
    else{
        alert("Erro ao inserir o funcionário. Valide os campos inseridos")
    }
})
