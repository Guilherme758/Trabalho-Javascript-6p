var usuarios = [
    {
        "Email": "exemple@email.com",
        "Senha": "123"
    },
    {
        "Email": "exemple1@email.com",
        "Senha": "1234"
    }
]

const emailDigitado = document.getElementById("email")
const senhaDigitada = document.getElementById("senha")
let mensagem = document.getElementById("mensagem")

const formLogin = document.getElementById('form-cadastro-funcionarios')

formLogin.addEventListener('submit', function(event){
    event.preventDefault()
    const inputEmail = emailDigitado.value.trimEnd().trimStart().toLowerCase()
    const inputSenha = senhaDigitada.value
    
    var isLogin = false

    for(let i=0; i < usuarios.length; i++){
        if(usuarios[i]['Email'] == inputEmail && usuarios[i]['Senha'] == inputSenha){
            window.location.replace("index.html") // Redireciona o usuário para a página inicial
            isLogin = true
            break
        } 
        else
        {
            isLogin = false
        }
    }
    if(!isLogin){
        alert("Senha ou Email incorretos");
        
        //Limpa os inputs
        senhaDigitada.value = ''
    }
})