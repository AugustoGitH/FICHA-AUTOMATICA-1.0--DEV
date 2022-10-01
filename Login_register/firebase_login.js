//lOGIN
const submit_form_login = document.querySelector("#submit_form_login")
const input_pass_login = document.querySelector("#input_pass_login")
const input_email_Login = document.querySelector("#input_email_Login")

submit_form_login.addEventListener("click", login)

function login(ev){
    ev.preventDefault()
    // let arrayInputs = [input_pass_login, input_email_Login]

    if(!input_pass_login.value || !input_email_Login.value){
        alert("Campo vazio! Preencha e tente novamente.")
    }else{
        Open_carregando()
        let userLogin = {
            email: input_email_Login.value,
            senha: input_pass_login.value
        }
        auth.signInWithEmailAndPassword(userLogin.email, userLogin.senha)
        .then(user =>{
            window.location.href = "/console/console.html";
        }).catch(err =>{
            console.log(err)
            document.querySelector(".class_carregar").remove()
            alert(getErrorMessageLogin(err))
        })

    }
}
function getErrorMessageLogin(error){
    if(error.code === 'auth/invalid-email'){
        return "Você digitou seu email incorretamente, verifique e tente novamente"
    }if(error.code === 'auth/wrong-password'){
        return "Senha incorreta, tente novamente"
    }if(error.code === 'auth/user-not-found'){
        return "Usuário não encontrado"
    }
}
function Open_carregando(){
    let container_carregar = document.createElement("div")
    container_carregar.classList.add("class_carregar")
    document.body.appendChild(container_carregar)
     
    let p = document.createElement("p")
    p.classList.add("p_carregando", "gif_carregando")
    p.innerText = "Logando..."
    container_carregar.appendChild(p)
}