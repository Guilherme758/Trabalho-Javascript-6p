const form = document.getElementById('form-aplicacao-vacinas')

const campos = [
    {
        "Nome": "nome-paciente",
        "Tipo": "texto"
    },

    {    
        "Nome": "nome-aplicador",
        "Tipo": "texto"
    },

    {
        "Nome": "data-vacinacao",
        "Tipo": "data"
    },

    {
        "Nome": "tipo-vacina",
        "Tipo": "texto"
    }
]


//Formulario
const paciente = document.getElementById('nome-paciente')
const aplicador = document.getElementById('nome-aplicador')
const data = document.getElementById('data-vacinacao')
const tipoVacina = document.getElementById('tipo-vacina')

function validarinputs(campos){
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
            else {
                span.innerText = ''
            }
        }

        else if(campo.Tipo == "cpf"){
            let cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/

            if(!cpfRegex.teste(input.value)){
                span.innerText = `${campo.Nome} não esta no padrao 000.000.000-00`
                span.style.color = 'red'
                contErros += 1
            }
            else {
                span.innerText = ''
            }
        }

        else if(campo.Tipo == "data"){
            let data = new Date(input.value)

            if(isNaN(data.getTime())){
                span.innerText = `${campo.Nome} não está no padrão correto ou não é uma data válida`
                span.style.color = 'red'
                contErros += 1
            }
            else {
                const dataAtual = new Date();
                const dataSelecionada = new Date(`${input.value} 03:00:00`)
                if(dataSelecionada > dataAtual){
                    span.innerText = `${campo.Nome} não pode ser futura`
                    span.style.color = 'red'
                    contErros += 1
                }  
                else{
                    span.innerText = ''
                }
            }
        }
    })

    if(contErros > 0){
        return false
    } else {
        return true
    }
}
form.addEventListener("submit", function (event) {
    event.preventDefault()
    if(validarinputs(campos) == true){
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
    } else {
        alert('Erro ao enviar o formulário. Valide os campos inseridos');
    }
})