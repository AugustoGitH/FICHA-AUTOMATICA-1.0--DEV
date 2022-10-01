function verifyUserConnect(){
    const buttons_acess = document.querySelector(".buttons_acess")
    const button_boasVindas = document.querySelector(".button_boasvindas")
    auth.onAuthStateChanged(user =>{
        if(!user){
            avisoTest()
            buttons_acess.innerHTML = '<a id="acessRegister" href="/Login_register/register.html">Faça seu registro</a> ou <a id="acessLogin" href="/Login_register/Login.html">Login</a>'
            button_boasVindas.href = "/Login_register/register.html"
            button_boasVindas.innerText = "Crie já sua conta e faça sua ficha!"
        }else{
            buttons_acess.innerHTML = '<a href="/console/console.html">Acessar console</a>'
            button_boasVindas.href = "/console/console.html"
            button_boasVindas.innerText = "Entre já na sua conta!"
           
        }
    })
}


function  avisoTest(){
    let container = document.createElement("div")
    container.classList.add("alert_testSite")
    document.body.appendChild(container)

    let h1msg = document.createElement("h1")
    h1msg.innerHTML = "Olá visitante!"
    container.appendChild(h1msg)

    let p_msg = document.createElement("p")
    p_msg.innerHTML = "Você está entrando em um protótipo não finalizado, o site pode apresentar estilizações não completas e alguns bugs.<br>Caso encontre algo que não deveria estar ali ou tenha sugestão para melhora, entre em contato com o desenvolvedor.<br><span>NÃO DIGITE EMAILS E SENHAS DE OUTRAS CONTAS NOS FORMULÁRIOS PARA A SUA SEGURANÇA.</span> "
    container.appendChild(p_msg)

    let button_ir = document.createElement("button")
    button_ir.innerText = "CONTINUAR"
    button_ir.addEventListener("click", ()=>{
        document.body.removeChild(container)
    })
    container.appendChild(button_ir)
}

document.addEventListener("DOMContentLoaded", ()=>{
    setTimeout(() => {document.querySelector(".tela_preload").remove()}, 1000);
    verifyUserConnect()
})