import { APIBaseURL } from "./config.js"

const emailDigitado = document.getElementById("email")
const senhaDigitada = document.getElementById("senha")
let mensagem = document.getElementById("mensagem")

const formLogin = document.getElementById('form-cadastro-funcionarios')

formLogin.addEventListener('submit', function(event){
    event.preventDefault()
    const inputEmail = emailDigitado.value.trimEnd().trimStart().toLowerCase()
    const inputSenha = senhaDigitada.value
    
    fetch(`${APIBaseURL}/auth/sign-in`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: inputEmail,
            password: inputSenha,
        })
    })
    .then(
        response => {
            if(response.status == 200){
                response.json().then(
                    token => {
                        localStorage.setItem("access_token", token.access_token)
                        window.location.replace("HTML/home.html") // Redireciona o usuário para a página inicial
                    }
                )
            }
            else{
                alert("Senha ou Email incorretos");
        
                //Limpa os inputs
                senhaDigitada.value = ''
            }
        }
    )
})