
// const db = firebase.firestore()
// const auth = firebase.auth()

//REGISTER
const submit_form_register = document.querySelector("#submit_form_register")
submit_form_register.addEventListener("click", registrar)

function registrar(ev){
    ev.preventDefault()
    const input_pass_register = ev.target.parentNode.querySelectorAll("span")[2].querySelector("input")
    const input_email_register = ev.target.parentNode.querySelectorAll("span")[1].querySelector("input")
    const input_nome = ev.target.parentNode.querySelectorAll("span")[0].querySelector("input")

    let not_spaceNome = input_nome.value.replace(/\s+/g, '')
    let arrayInputs = [input_pass_register, input_email_register, input_nome]



    if(!input_pass_register.value || !input_email_register.value  || !input_nome.value){
            alert("Campo vazio! Preencha e tente novamente.")
    }else{
            Open_carregando()
            let new_user = {
                email: input_email_register.value,
                senha: input_pass_register.value
            }
            auth.createUserWithEmailAndPassword(new_user.email, new_user.senha)
                .then(user =>{
                    criar_userDb(not_spaceNome, input_email_register.value).then(()=>{
                        Open_carregando_att()
                        setTimeout(()=>{
                            arrayInputs.forEach((input)=>{
                                input.value = ""
                            })
                            window.location.href = "/login_register/login.html";
                        }, 2000)
                    })
                }).catch(err =>{
                    alert( getErrorMessageRegister(err))
                    document.querySelector(".class_carregar").remove()
                })
        }
}
function getErrorMessageRegister(error){
    if(error.code === 'auth/email-already-in-use'){
        return "Este endereço de e-mail já está sendo usado."
    }if(error.code === 'auth/weak-password'){
        return "A senha deve ter pelo menos 6 caracteres"
    }if(error.code === 'auth/invalid-email'){
        return "Você digitou seu email incorretamente, verifique e tente novamente"
    }else{
        return error
    }
}

function  criar_userDb(nome_user, email_user){
    let promise_criarDBUser = new Promise((resolve, reject)=>{
        auth.onAuthStateChanged(user =>{
            if(user){
                db.collection("Players").doc(user.uid).set({
                    user_infos: {
                        nome: nome_user,
                        email: email_user,
                        img_perfil: "/Assets/user.png"
                    },
                    Fichas: []
                }).then( ()=>{
                    resolve()
                }).catch(err =>{
                    reject(err)
                })
            }else{
                console.log("Nenhum usuario!")
            }
        })
    })
    return promise_criarDBUser
}
function Open_carregando(){
    let container_carregar = document.createElement("div")
    container_carregar.classList.add("class_carregar")
    document.body.appendChild(container_carregar)
     
    let p = document.createElement("p")
    p.classList.add("p_carregando", "gif_carregando")
    p.innerText = "Registrando..."
    container_carregar.appendChild(p)
}
function Open_carregando_att(){
    const p_carregando = document.querySelector(".p_carregando")
    setTimeout(()=>{
        p_carregando.innerText = "Conta registrada!"
        p_carregando.classList.remove("gif_carregando")
        p_carregando.classList.add("gif_sucess")
    }, 700)
}
