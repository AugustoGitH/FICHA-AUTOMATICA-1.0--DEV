
function verifyUserDados_Window(){
    auth.onAuthStateChanged(user => {
        if(user){
            addDados_User_Page(user.uid)
        }else{
            console.log("User não logado!")
        }
    })
}
function addDados_User_Page(user){
    let docRef = db.collection("Players").doc(user)
    docRef.get().then((doc)=>{
        console_tela_pronto()
        User_name_appendConsol(doc.data().user_infos)
    })
}



function User_name_appendConsol(user){
    const user_input = document.querySelector(".saudacao_user")
    const name_userPerfil = document.querySelector(".name_user")
    const img_user = document.querySelector(".image_user")
    user_input.innerHTML = "Olá "+ user.nome.split("")[0].toUpperCase() +  user.nome.substring(1) +"!"
    name_userPerfil.innerHTML = user.nome
    img_user.innerHTML = `<img src="${user.img_perfil}">`
    
}
function console_tela_pronto(){
    setTimeout(()=>{
        document.querySelector("#carregando_white").remove()
    }, 1000)
}

function alterar_nomeConsole(input, label, container){
    if(!input.value){
        alert("Campo vazio")
    }else{
        label.style.visibility = "hidden"
        let user = auth.currentUser.uid
        db.collection("Players").doc(user).set({
            user_infos: {
                nome: input.value
            }
        }, {merge: true }).then(()=>{
            window.location.reload()
            document.body.removeChild(container)
        }).catch(err =>{
            console.log("Erro ao alterar o nome de usuário " + err)
        })
    }
}
//LOGOUT
function logout(){
    auth.signOut().then(()=>{
        window.location.href = "/index.html";
    }).catch(err=>{
        console.log(err)
    })
}

function map_fichasDb(){
    auth.onAuthStateChanged(user => {
        if(user){
            let userDoc = user.uid
            let docRef = db.collection("Players").doc(userDoc)
            docRef.get().then((doc)=>{
                let fichasArray = doc.data().Fichas
                fichasArray.forEach(ficha => {
                    mostrar_fichasPlayer(ficha)
                })
            }).catch(err =>{
                console.log("Erro ao carregar fichas no console" + err)
            })
        }else{
            console.log("opa, erro")
        }
    })

}

document.addEventListener("DOMContentLoaded", ()=>{
    verifyUserDados_Window()
    localStorage.removeItem("IDFicha")
    map_fichasDb()
})
