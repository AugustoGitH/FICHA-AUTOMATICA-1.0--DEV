

function criar_poopLogout(msg, fun){
    let poop_logout = document.createElement("div")
    poop_logout.classList.add("poop_logout")
    document.body.appendChild(poop_logout)

    let poop_logout_content = document.createElement("div")
    poop_logout_content.classList.add("poop_logout_content")
    poop_logout.appendChild(poop_logout_content)

    let p = document.createElement("p")
    p.innerHTML = msg
    poop_logout_content.appendChild(p)

    let span = document.createElement("span")
    poop_logout_content.appendChild(span)

    

    let button_logout = document.createElement("button")
    span.appendChild(button_logout)
    button_logout.innerHTML = "SIM"
    button_logout.addEventListener("click", fun)

    let button_poopNone = document.createElement("button")
    span.appendChild(button_poopNone)
    button_poopNone.innerHTML = "NÃO"
    button_poopNone.onclick = ()=>{
        document.body.removeChild(poop_logout)
    }
}

function openlist_perfil(){
    if(!document.querySelector(".list_menuPerfil")){
        const container = document.querySelector(".user_perfil_cont")

        let list_menuPerfil = document.createElement("ul")
        list_menuPerfil.classList.add("list_menuPerfil")
        container.appendChild(list_menuPerfil)
    
        let LI_alterar_nomePerfil = document.createElement("li")
        LI_alterar_nomePerfil.addEventListener("click", ()=>{
            container.removeChild(list_menuPerfil)
            mostrarInput_alterarNome()
        })
        LI_alterar_nomePerfil.innerHTML = "ALTERAR NOME DE PERFIL"
        list_menuPerfil.appendChild(LI_alterar_nomePerfil)
    
        let LI_alterar_fotoPerfil = document.createElement("li")
        LI_alterar_fotoPerfil.addEventListener("click", ()=>{
            container.removeChild(list_menuPerfil)
            mostrar_optionsFotosPerfil()
        })
        LI_alterar_fotoPerfil.innerHTML = "ALTERAR FOTO DE PERFIL"
        list_menuPerfil.appendChild(LI_alterar_fotoPerfil)
    
        let LI_logout = document.createElement("li")
        LI_logout.addEventListener("click", ()=>{
            container.removeChild(list_menuPerfil)
            criar_poopLogout("Você deseja sair da sua conta?", logout)
        })
        LI_logout.innerHTML = "SAIR DA CONTA"
        list_menuPerfil.appendChild(LI_logout)
    }else{
        document.querySelector(".list_menuPerfil").remove()
        document.querySelector(".options_FotosPerfil").remove()
    }
    
}
function mostrar_optionsFotosPerfil(){
    let docRef = db.collection("Assets images").doc("Al4r5yFS5Y4Mutmopg7W")
    docRef.get().then((doc)=>{
        let imgs = doc.data().Options_imagesPerfil
        criarMap_optionsPerfil(imgs)
    })
       
}
function criarMap_optionsPerfil(collection){
    const container = document.querySelector(".user_perfil_cont")

    let options_FotosPerfil = document.createElement("div")
    options_FotosPerfil.classList.add("options_FotosPerfil")
    container.appendChild(options_FotosPerfil)

    collection.forEach(img => {
        options_FotosPerfil.innerHTML += `<img onclick="salvarImg_PerfilDb(this)" src="${img.url}">`
    });
}
function salvarImg_PerfilDb(el){
    let user = auth.currentUser.uid
    db.collection("Players").doc(user).set({
        user_infos: {
            img_perfil: el.src
        }
    }, {merge: true }).then(()=>{
        window.location.reload()
    }).catch(err =>{
        console.log("Erro ao adicionar imagem de perfil! " + err)
    })
}
function mostrarInput_alterarNome(){
    let container = document.createElement("div")
    container.classList.add("Page_contInput_alterarnome")

    document.body.appendChild(container)

    let label = document.createElement("label")
    label.classList.add("input_alterarnome")
    container.appendChild(label)

    let p = document.createElement("p")
    p.innerHTML = "Digite seu novo nome:"
    label.appendChild(p)

    let input = document.createElement("input")
    input.type = "text"
    input.placeholder = "Digite seu novo nome"
    input.autofocus = true
    input.maxLength = "20"
    label.appendChild(input)

    let button_alterar = document.createElement("button")
    button_alterar.innerHTML = "Alterar"
    button_alterar.addEventListener("click", ()=>{
        alterar_nomeConsole(input, label, container)
    })
    label.appendChild(button_alterar)

    let button_cancel = document.createElement("button")
    button_cancel.innerHTML = "Cancelar"
    button_cancel.addEventListener("click", ()=>{
        document.body.removeChild(container)
    })
    label.appendChild(button_cancel)


}

function  mostrar_fichasPlayer(ficha){
    let container = document.querySelector(".ul_fichasPresents")

    let FichaLi = document.createElement("li")
    container.appendChild(FichaLi)




    let img_perfil = document.createElement("div")
    img_perfil.classList.add("img_perfil")
    FichaLi.appendChild(img_perfil)

    let img = document.createElement("img")
    img.src = ficha.infosFicha.perfil_ficha
    img_perfil.appendChild(img)

    let span = document.createElement("span")
    FichaLi.appendChild(span)

    let p_nome = document.createElement("p")
    p_nome.innerHTML = "Nome: " +  ficha.infosFicha.nome_ficha
    span.appendChild(p_nome)

    let span_data = document.createElement("span")
    span_data.innerHTML = "Criação: " +  ficha.infosFicha.time_create
    span.appendChild(span_data)

    let button_acessar = document.createElement("button")
    button_acessar.classList.add("button_acessar")
    button_acessar.innerText = "Acessar"
    button_acessar.addEventListener("click", ()=>{
        localStorage.setItem("IDFicha", ficha.infosFicha.id_ficha)
        window.location.href = "/Pag_ficha/suaficha.html"
        
    })
    FichaLi.appendChild(button_acessar)
    
}
