// Funcionários "chumbados"
var funcionarios = [
    {
        "Nome": "Pedro",
        "Cpf": "000.000.000-01",
        "Registro": "123",
        "Sexo": "Masculino",
        "DataNascimento": "14/01/2000",
        "Cidade": "São Paulo",
        "Email": "pedro@gmail.com"
    },
    {
        "Nome": "Ana",
        "Cpf": "000.000.000-02",
        "Registro": "456",
        "Sexo": "Feminino",
        "DataNascimento": "27/02/2003",
        "Cidade": "Pouso Alegre",
        "Email": "Ana@gmail.com"
    },
    {
        "Nome": "Maria",
        "Cpf": "000.000.000-03",
        "Registro": "789",
        "Sexo": "Feminino",
        "DataNascimento": "09/12/1995",
        "Cidade": "Rio de Janeiro",
        "Email": "maria@gmail.com"
    }
]

// Variáveis globais
const modalBody = document.querySelector('#modal-funcionario .modal-body');
const modal = document.getElementById('modal-funcionario');
const buttonAtualizarFuncionario = document.getElementById('btn-atualizar-funcionario')
const formSubmitAtualizarFuncionario = document.querySelector('#modal-funcionario .modal-footer form')
const tbodyFuncionarios = document.querySelector('#tabela-funcionarios > tbody')
var cpfFuncionario = ''

// Bloco responsável for fazer a lógica do botão de exclusão (Excluir a linha do registro)
function botoesDeExcluir() {
    const botoesExcluir = document.getElementsByClassName('btn-excluir')
    const arrayBotoesExcluir = Array.from(botoesExcluir)

    arrayBotoesExcluir.forEach(function (botaoExcluir) {
        botaoExcluir.addEventListener('click', function (event) {
            var resposta = window.confirm("Deseja realmente excluir o usuário?"); // Retorna true caso clique em ok ou false caso clique em cancelar
            if (resposta == true) {
                var cpfRemovido = event.target.closest("tr").querySelector('td[tipo="cpf"]').innerText

                event.target.closest("tr").remove() // Remove a linha

                // Remove o funcionário do array
                funcionarios = funcionarios.filter(function (funcionario) {
                    if (funcionario.Cpf != cpfRemovido) {
                        return funcionario
                    }
                })
            }
        })
    })
}

// Bloco responsável for fazer a lógica do botão de visualizar
function botoesDeVisualizar() {
    const botoesVisualizar = document.getElementsByClassName('btn-visualizar')
    const arrayBotoesVisualizar = Array.from(botoesVisualizar)

    arrayBotoesVisualizar.forEach(function (botaoVisualizar) {
        botaoVisualizar.addEventListener('click', function (event) {
            const funcionario = event.target.closest("tr").querySelectorAll("td");
            const dadosFuncionario = {
                nome: funcionario[0].textContent,
                cpf: funcionario[1].textContent,
                registro: funcionario[2].textContent
            };

            // Preenche o conteúdo do modal
            modalBody.innerHTML = `
                <p>Nome: ${dadosFuncionario.nome}</p>
                <p>CPF: ${dadosFuncionario.cpf}</p>
                <p>Registro: ${dadosFuncionario.registro}</p>
                <p>Sexo: ${funcionarios.find(f => f.Cpf == dadosFuncionario.cpf).Sexo}</p>
                <p>Data de Nascimento: ${funcionarios.find(f => f.Cpf == dadosFuncionario.cpf).DataNascimento}</p>
                <p>Cidade: ${funcionarios.find(f => f.Cpf == dadosFuncionario.cpf).Cidade}</p>
                <p>Email: ${funcionarios.find(f => f.Cpf == dadosFuncionario.cpf).Email}</p>
            `

            // Abre o modal
            modal.classList.add('show');
            modal.style.display = 'block';

            // Esconde o botão de atualizar funcionário
            buttonAtualizarFuncionario.setAttribute('hidden', '')
        })
    })
}

// Bloco responsável por fazer a lógica da edição dos dados do funcionário
function botoesDeEditar() {
    const botoesEditar = document.getElementsByClassName('btn-editar')
    const arrayBotoesEditar = Array.from(botoesEditar)

    // Bloco responsável por fazer a lógica da edição dos dados do funcionário
    arrayBotoesEditar.forEach(function (botaoEditar) {
        botaoEditar.addEventListener('click', function (event) {
            modalBody.innerHTML = `
            <form>
                <div class="mb-3 mx-3">
                <label for="nome" class="form-label">Nome</label>
                <input type="text" class="form-control" id="nome" placeholder="Digite Seu nome">
                </div>
                <div class="mb-3 mx-3">
                <label for="registro" class="form-label">Registro</label>
                <input type="text" class="form-control" id="registro" placeholder="Descrição">
                </div>
                <div class="mb-3 mx-3">
                <label for="cidade" class="form-label">Cidade</label>
                <input type="text" class="form-control" id="cidade" placeholder="Ex: São Paulo - SP">
                </div>
                <div class="mb-3 mx-3">
                <label for="email" class="form-label">Email</label>
                <input type="text" class="form-control" id="email" placeholder="Exemple@email.com">
                </div>
            </form>
        `
            // Pega o cpf do funcionário que vai ser editado antes de abrir o modal
            cpfFuncionario = event.target.closest("tr").querySelectorAll("td")[1].innerText

            // Mostra o modal
            modal.classList.add('show');
            modal.style.display = 'block';

            // Mostra o botão de atualizar funcionário
            buttonAtualizarFuncionario.removeAttribute('hidden')
        })
    })
}

// Insere todos os funcionários chumbados na tabela e cria também os botôes de Visualizar, Editar e Excluir
function criaTabelaFuncionarios(funcionarios) {
    funcionarios.forEach(function (funcionario) {
        const linha = tbodyFuncionarios.insertRow();
        linha.setAttribute('id', funcionario.Cpf)
        linha.innerHTML = `
        <td tipo="nome">${funcionario.Nome}</td>
        <td tipo="cpf">${funcionario.Cpf}</td>
        <td tipo="registro">${funcionario.Registro}</td>
        <td>
            <button type="button" class="btn btn-sm btn-success btn-visualizar" title="Visualizar">
                <img src="../Icons/icon-visualizar.svg" width="20" height="20">
            </button>

            <button type="button" class="btn btn-sm btn-primary btn-editar" title="Editar">
                <img src="../Icons/icon-editar.svg" width="20" height="20">
            </button>

            <button type="button" class="btn btn-sm btn-danger btn-excluir" title="Excluir">
                <img src="../Icons/icon-excluir.svg" width="20" height="20">
            </button>
        </td>
    `
        tbodyFuncionarios.appendChild(linha)
    })

    // Cria os listeners dos botôes recém-criados
    botoesDeExcluir()
    botoesDeEditar()
    botoesDeVisualizar()
}

// Bloco responsável por atualizar a tabela de Funcionarios
function atualizaTabelaFuncionarios(funcionario) {
    const linha = document.getElementById(funcionario.Cpf)
    const nome = linha.querySelector('td[tipo="nome"]')
    const registro = linha.querySelector('td[tipo="registro"]')

    nome.innerText = funcionario.Nome
    registro.innerText = funcionario.Registro
}

// Bloco responsável por implementar a lógica da barra e botão de pesquisa
const botaoFiltrarNome = document.getElementById('btn-filtrar-nome')
const inputFiltrarNome = document.getElementById('input-filtrar-nome')
botaoFiltrarNome.addEventListener('click', function (event) {
    const texto = inputFiltrarNome.value.toLowerCase().trimStart().trimEnd()

    if (texto != '') {
        const funcionariosFiltrados = funcionarios.filter(function (funcionario) {
            if (funcionario.Nome.toLowerCase().includes(texto)) {
                return funcionario
            }
        })
        tbodyFuncionarios.innerHTML = ''
        criaTabelaFuncionarios(funcionariosFiltrados)
    }
    else {
        tbodyFuncionarios.innerHTML = ''
        criaTabelaFuncionarios(funcionarios)
    }
})

// Bloco responsável por fechar o modal de visualização
const botoesFecharModal = document.getElementsByClassName('btn-fechar-modal')
const arrayBotoesFecharModal = Array.from(botoesFecharModal)
arrayBotoesFecharModal.forEach(function (botaoFecharModal) {
    botaoFecharModal.addEventListener('click', function (event) {
        const modal = document.getElementById('modal-funcionario');
        modal.style.display = null;
        modal.classList.remove('show');
    })
})

// Bloco responsável por fazer a atualização do funcionário
formSubmitAtualizarFuncionario.addEventListener('submit', function (event) {
    event.preventDefault() // Impede a página de dar F5 após o submit
    const nome = document.getElementById('nome')
    const registro = document.getElementById('registro')
    const cidade = document.getElementById('cidade')
    const email = document.getElementById('email')

    funcionarios = funcionarios.map(function (funcionario) {
        if (funcionario['Cpf'] == cpfFuncionario) {
            funcionario['Nome'] = nome.value
            funcionario['Registro'] = registro.value
            funcionario['Cidade'] = cidade.value
            funcionario['Email'] = email.value

            atualizaTabelaFuncionarios(funcionario)
        }
        return funcionario
    })
})

criaTabelaFuncionarios(funcionarios)