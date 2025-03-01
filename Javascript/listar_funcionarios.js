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

function criaTabelaFuncionarios(funcionarios){
    // Pega o tbody da tabela
const tbodyFuncionarios = document.querySelector('#tabela-funcionarios > tbody')

// Insere todos os funcionários chumbados na tabela e cria também os botôes de Visualizar, Editar e Excluir
funcionarios.forEach(function (funcionario) {
    const linha = tbodyFuncionarios.insertRow();
    linha.innerHTML = `
        <td>${funcionario.Nome}</td>
        <td>${funcionario.Cpf}</td>
        <td>${funcionario.Registro}</td>
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
}

criaTabelaFuncionarios(funcionarios)

// Bloco responsável for fazer a lógica do botão de exclusão (Excluir a linha do registro)
const botoesExcluir = document.getElementsByClassName('btn-excluir')

const arrayBotoesExcluir = Array.from(botoesExcluir)

arrayBotoesExcluir.forEach(function (botaoExcluir) {
    botaoExcluir.addEventListener('click', function (event) {
        var resposta = window.confirm("Deseja realmente excluir o usuário?"); // Retorna true caso clique em ok ou false caso clique em cancelar
        if (resposta == true) {
            event.target.closest("tr").remove() // Remove a linha
        }
    })
})

// Bloco responsável for fazer a lógica do botão de visualizar
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
        const modalBody = document.querySelector('#modal-funcionario .modal-body');
        modalBody.innerHTML = `
      <p>Nome: ${dadosFuncionario.nome}</p>
      <p>CPF: ${dadosFuncionario.cpf}</p>
      <p>Registro: ${dadosFuncionario.registro}</p>
      <p>Sexo: ${funcionarios.find(f => f.Nome === dadosFuncionario.nome).Sexo}</p>
      <p>Data de Nascimento: ${funcionarios.find(f => f.Nome === dadosFuncionario.nome).DataNascimento}</p>
      <p>Cidade: ${funcionarios.find(f => f.Nome === dadosFuncionario.nome).Cidade}</p>
      <p>Email: ${funcionarios.find(f => f.Nome === dadosFuncionario.nome).Email}</p>
    `;

        // Abre o modal
        const modal = document.getElementById('modal-funcionario');
        modal.classList.add('show');
        modal.style.display = 'block';
    })
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

// Bloco responsável por Editar o modal de editar
const botoesEditar = document.getElementsByClassName('btn-editar')

const arrayBotoesEditar = Array.from(botoesEditar)

// TODO: Corrigir a edição dos dados, no momento não está funcionando
arrayBotoesEditar.forEach(function (botaoEditar) {
    botaoEditar.addEventListener('click', function (event) {
        const modal = document.getElementById('modal-funcionario')
        const modalBody = document.querySelector('#modal-funcionario .modal-body');
        modalBody.innerHTML = `
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
        `
        const cpfFuncionario = event.target.closest("tr").querySelectorAll("td")[1].innerText

        modal.classList.add('show');
        modal.style.display = 'block';
        
        const botaoSubmitAtualizarFuncionario = document.getElementById('btn-atualizar-funcionario')

        botaoSubmitAtualizarFuncionario.addEventListener('click', function(event){
            event.preventDefault() 
            const nome = document.getElementById('nome')
            const registro = document.getElementById('registro')
            const cidade = document.getElementById('cidade')
            const email = document.getElementById('email')

            // funcionarios = funcionarios.map(function(funcionario){
            //     if(funcionario['Cpf'] == cpfFuncionario){
            //         funcionario['Nome'] = nome
            //         funcionario['Registro'] = registro
            //         funcionario['cidade'] = cidade
            //         funcionario['email'] = email
            //     }
            // })
            console.log('Salvando')

            criaTabelaFuncionarios(funcionarios)
        })
    })
})