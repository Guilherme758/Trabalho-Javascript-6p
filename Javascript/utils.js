import { APIBaseURL } from "./config.js"

export async function login(email, password){
    fetch(`${APIBaseURL}/auth/sign-in`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
    .then(
        response => {
            if(response.status == 200){
                response.json().then(
                    token => {
                        console.log("Logou")
                        localStorage.setItem("access_token", token.access_token)
                        return true
                    }
                )
            }
            else{
                console.log("Não logou")
                return false
            }
        }
    )
}

export function refreshToken(email, password){
    fetch(`${APIBaseURL}/auth/sign-in`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
    .then(
        response => response.json()).then(token => {
            localStorage.setItem("access_token", token.access_token)
        }
    )
}