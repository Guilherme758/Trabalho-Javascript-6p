var vacinas = [
    {
        "ID": 1,
        "Nome": "Astrazenica",
        "Descricao": "Vacina Astrazenica",
        "Obrigatoria": "Não"
    },
    {
        "ID": 2,
        "Nome": "Antitétano",
        "Descricao": " Diminui o efeito do tétano",
        "Obrigatoria": "Sim"
    },
    {
        "ID": 3,
        "Nome": "Covid-19",
        "Descricao": "Vacina desenvolvida no Buintantam, vai confiar?",
        "Obrigatoria": "Sim"
    },
    {
        "ID": 4,
        "Nome": "BCG",
        "Descricao": "Vacina para pessoas com menos de 1 ano",
        "Obrigatoria": "Sim"
    },
    {
        "ID": 5,
        "Nome": "Vacina A",
        "Descricao": "Vacina A",
        "Obrigatoria": "Não"
    },
    {
        "ID": 6,
        "Nome": "Vacina B",
        "Descricao": "Vacina B",
        "Obrigatoria": "Não"
    }
]

// Variáveis globais
const modalBody = document.querySelector('#modal-vacina .modal-body');
const modal = document.getElementById('modal-vacina');
const buttonAtualizarvacina = document.getElementById('btn-atualizar-vacina')
const formSubmitAtualizarvacina = document.querySelector('#modal-vacina .modal-footer form')
const tbodyvacinas = document.querySelector('#tabela-vacinas > tbody')
var idVacina = ''

// Bloco responsável for fazer a lógica do botão de exclusão (Excluir a linha do registro)
function botoesDeExcluir() {
    const botoesExcluir = document.getElementsByClassName('btn-excluir')
    const arrayBotoesExcluir = Array.from(botoesExcluir)

    arrayBotoesExcluir.forEach(function (botaoExcluir) {
        botaoExcluir.addEventListener('click', function (event) {
            var resposta = window.confirm("Deseja realmente excluir a vacina?"); // Retorna true caso clique em ok ou false caso clique em cancelar
            if (resposta == true) {
                var vacinaRemovida = event.target.closest("tr").getAttribute('id')

                event.target.closest("tr").remove() // Remove a linha

                // Remove a vacina do array
                vacinas = vacinas.filter(function (vacina) {
                    if (vacina.ID != vacinaRemovida) {
                        return vacina
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
            const vacina = event.target.closest("tr").getAttribute('id')

            // Preenche o conteúdo do modal
            modalBody.innerHTML = `
                <p>Nome: ${vacinas.find(f => f.ID == vacina).Nome}</p>
                <p>Descrição: ${vacinas.find(f => f.ID == vacina).Descricao}</p>
                <p>Obrigatória: ${vacinas.find(f => f.ID == vacina).Obrigatoria}</p>
            `

            // Abre o modal
            modal.classList.add('show');
            modal.style.display = 'block';

            // Esconde o botão de atualizar funcionário
            buttonAtualizarvacina.setAttribute('hidden', '')
        })
    })
}

// Bloco responsável por fazer a lógica da edição dos dados da vacina
function botoesDeEditar() {
    const botoesEditar = document.getElementsByClassName('btn-editar')
    const arrayBotoesEditar = Array.from(botoesEditar)

    // Bloco responsável por fazer a lógica da edição dos dados da vaci
    arrayBotoesEditar.forEach(function (botaoEditar) {
        botaoEditar.addEventListener('click', function (event) {
            modalBody.innerHTML = `
            <form>
                <div class="mb-3 mx-3">
                <label for="nome" class="form-label">Nome</label>
                <input type="text" class="form-control" id="nome" placeholder="Digite o nome da vacina">
                </div>
                <div class="mb-3 mx-3">
                <label for="descricao" class="form-label">Descrição</label>
                <input type="text" class="form-control" id="descricao" placeholder="Digite a descrição da vacina">
                </div>
                <div class="mb-3 mx-3">
                <label for="obrigatoria" class="form-label">Obrigatória</label>
                <select class="form-select" id="obrigatoria" required>
                    <option selected disabled value="">Escolha uma opção</option>
                    <option>Sim</option>
                    <option>Não</option>
                </select> 
                </div>
            </form>
        `
            // Pega o id da vacina que vai ser editado antes de abrir o modal
            idVacina = event.target.closest("tr").getAttribute('id')

            // Mostra o modal
            modal.classList.add('show');
            modal.style.display = 'block';

            // Mostra o botão de atualuzar a vacina
            buttonAtualizarvacina.removeAttribute('hidden')
        })
    })
}

// Insere todos as vacinas chumbados na tabela e cria também os botôes de Visualizar, Editar e Excluir
function criaTabelaVacinas(vacinas) {
    vacinas.forEach(function (vacina) {
        const linha = tbodyvacinas.insertRow();
        linha.setAttribute('id', vacina.ID)
        linha.innerHTML = `
        <td tipo="nome">${vacina.Nome}</td>
        <td tipo="descricao">${vacina.Descricao}</td>
        <td tipo="obrigatoria">${vacina.Obrigatoria}</td>
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
        tbodyvacinas.appendChild(linha)
    })

    // Cria os listeners dos botôes recém-criados
    botoesDeExcluir()
    botoesDeEditar()
    botoesDeVisualizar()
}

// Bloco responsável por atualizar a tabela de vacinas
function atualizaTabelaVacinas(vacina) {
    const linha = document.getElementById(vacina.ID)
    const nome = linha.querySelector('td[tipo="nome"]')
    const descricao = linha.querySelector('td[tipo="descricao"]')
    const obrigatoria = linha.querySelector('td[tipo="obrigatoria"]')

    nome.innerText = vacina.Nome
    descricao.innerText = vacina.Descricao
    obrigatoria.innerText = vacina.Obrigatoria
}

// Bloco responsável por implementar a lógica da barra e botão de pesquisa
const botaoFiltrarNome = document.getElementById('btn-filtrar-nome')
const inputFiltrarNome = document.getElementById('input-filtrar-nome')
botaoFiltrarNome.addEventListener('click', function (event) {
    const texto = inputFiltrarNome.value.toLowerCase().trimStart().trimEnd()

    if (texto != '') {
        const vacinasFiltradas = vacinas.filter(function (vacina) {
            if (vacina.Nome.toLowerCase().includes(texto)) {
                return vacina
            }
        })
        tbodyvacinas.innerHTML = ''
        criaTabelaVacinas(vacinasFiltradas)
    }
    else {
        tbodyvacinas.innerHTML = ''
        criaTabelaVacinas(vacinas)
    }
})

// Bloco responsável por fechar o modal de visualização
const botoesFecharModal = document.getElementsByClassName('btn-fechar-modal')
const arrayBotoesFecharModal = Array.from(botoesFecharModal)
arrayBotoesFecharModal.forEach(function (botaoFecharModal) {
    botaoFecharModal.addEventListener('click', function (event) {
        const modal = document.getElementById('modal-vacina');
        modal.style.display = null;
        modal.classList.remove('show');
    })
})

// Bloco responsável por fazer a atualização da Vacina
formSubmitAtualizarvacina.addEventListener('submit', function (event) {
    event.preventDefault() // Impede a página de dar F5 após o submit
    const nome = document.getElementById('nome')
    const descricao = document.getElementById('descricao')
    const obrigatoria = document.getElementById('obrigatoria')
   
    vacinas = vacinas.map(function (vacina) {
        if (vacina['ID'] == idVacina) {
            vacina['Nome'] = nome.value
            vacina['Descricao'] = descricao.value
            vacina['Obrigatoria'] = obrigatoria.value

            atualizaTabelaVacinas(vacina)
        }
        return vacina
    })
})

criaTabelaVacinas(vacinas)