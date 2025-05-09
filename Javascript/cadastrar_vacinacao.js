// URLs centralizadas
const API_URL = 'http://localhost:3000'
const URL_FUNCIONARIOS = `${API_URL}/funcionarios`
const URL_VACINAS = `${API_URL}/vacinas`
const URL_VACINACOES = `${API_URL}/vacinacoes`

// Elementos do DOM
const form = document.getElementById('form-aplicacao-vacinas')
const paciente = document.getElementById('nome-paciente')
const aplicador = document.getElementById('nome-aplicador')
const data = document.getElementById('data-vacinacao')
const tipoVacina = document.getElementById('tipo-vacina')

// Campos para validação
const campos = [
    { "Nome": "nome-paciente", "Tipo": "texto" },
    { "Nome": "nome-aplicador", "Tipo": "texto" },
    { "Nome": "data-vacinacao", "Tipo": "data" },
    { "Nome": "tipo-vacina", "Tipo": "texto" }
]

// Função auxiliar para limpar selects
function limparSelect(selectElement) {
    while (selectElement.firstChild) {
        selectElement.removeChild(selectElement.firstChild)
    }
}

// Função para adicionar option padrão
function adicionarOptionPadrao(selectElement, texto) {
    const option = document.createElement('option')
    option.selected = true
    option.disabled = true
    option.value = ""
    option.textContent = texto
    selectElement.appendChild(option)
}

// Função para carregar dados iniciais
async function carregarDadosIniciais() {
    try {
        const [funcionarios, vacinas] = await Promise.all([
            fetch(URL_FUNCIONARIOS).then(res => {
                if (!res.ok) throw new Error('Erro ao carregar funcionários')
                return res.json()
            }),
            fetch(URL_VACINAS).then(res => {
                if (!res.ok) throw new Error('Erro ao carregar vacinas')
                return res.json()
            })
        ])
        
        preencherSelects(funcionarios, vacinas)
    } catch (error) {
        console.error('Erro:', error)
        alert(error.message)
    }
}

// Preencher selects
function preencherSelects(funcionarios, vacinas) {
    // Limpar e preencher vacinas
    limparSelect(tipoVacina)
    adicionarOptionPadrao(tipoVacina, "Selecione uma vacina")
    
    vacinas.forEach(vacina => {
        const option = document.createElement('option')
        option.value = vacina.id
        option.textContent = vacina.Nome
        tipoVacina.appendChild(option)
    })

    // Limpar e preencher pacientes
    limparSelect(paciente)
    adicionarOptionPadrao(paciente, "Selecione um paciente")
    
    funcionarios.forEach(funcionario => {
        const option = document.createElement('option')
        option.value = funcionario.id
        option.textContent = `${funcionario.Nome} (${funcionario.Cpf})`
        paciente.appendChild(option)
    })

    // Configurar aplicador
    limparSelect(aplicador)
    adicionarOptionPadrao(aplicador, "Selecione o aplicador")
    aplicador.disabled = true
}

// Atualizar aplicadores disponíveis
paciente.addEventListener('change', function() {
    const idSelecionado = this.value
    
    // Limpar aplicador sem innerHTML
    limparSelect(aplicador)
    adicionarOptionPadrao(aplicador, "Selecione o aplicador")
    
    if (idSelecionado) {
        // Clonar options válidos
        const options = paciente.options
        for (let i = 0; i < options.length; i++) {
            if (options[i].value && options[i].value !== idSelecionado) {
                const clonedOption = options[i].cloneNode(true)
                aplicador.appendChild(clonedOption)
            }
        }
        aplicador.disabled = false
    } else {
        aplicador.disabled = true
    }
})

// Validação
function validaInputs(campos) {
    let valido = true

    campos.forEach(campo => {
        const input = document.getElementById(campo.Nome)
        const span = document.getElementById(`span-${campo.Nome}`)

        if (campo.Tipo === "texto" && (!input.value || input.value.trim() === "")) {
            span.textContent = "Campo obrigatório"
            span.style.color = 'red'
            valido = false
        } else if (campo.Tipo === "data") {
            const dataVal = new Date(input.value)
            if (isNaN(dataVal.getTime())) {
                span.textContent = "Data inválida"
                span.style.color = 'red'
                valido = false
            } else {
                const dataAtual = new Date()
                const dataSelecionada = new Date(input.value)
                if (dataSelecionada > dataAtual) {
                    span.textContent = "Data não pode ser futura"
                    span.style.color = 'red'
                    valido = false
                } else {
                    span.textContent = ""
                }
            }
        } else {
            span.textContent = ""
        }
    })

    return valido
}

// Submit do formulário
form.addEventListener("submit", async function(event) {
    event.preventDefault()
    
    if (validaInputs(campos)) {
        try {
            const response = await fetch(URL_VACINACOES, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    pacienteId: paciente.value,
                    aplicadorId: aplicador.value,
                    data: data.value,
                    vacinaId: tipoVacina.value
                })
            })

            if (!response.ok) throw new Error('Erro ao salvar vacinação')

            alert("Vacinação registrada com sucesso!")
        
            // Resetar form sem innerHTML
            form.reset()
            limparSelect(aplicador)
            adicionarOptionPadrao(aplicador, "Selecione o aplicador")
            aplicador.disabled = true
            
            // Recarregar dados
            await carregarDadosIniciais()
            
        } catch (error) {
            console.error('Erro:', error)
            alert("Erro ao salvar os dados. Por favor, tente novamente.")
        }
    }
})

// Inicialização
document.addEventListener('DOMContentLoaded', carregarDadosIniciais)