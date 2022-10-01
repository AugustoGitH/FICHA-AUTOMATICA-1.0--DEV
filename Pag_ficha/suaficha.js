document.addEventListener("DOMContentLoaded", ()=>{
    tela_carregamento(true)
    abrirFichaUser()
})



function abrirFichaUser(){
    let FichaIdUser = localStorage.getItem("IDFicha")
    
    auth.onAuthStateChanged(user => {
        if(user){
            let userDoc = user.uid
            let docRef = db.collection("Players").doc(userDoc)
            docRef.get().then((doc)=>{
                let fichasArray = doc.data().Fichas
                fichasArray.forEach(ficha => {
                    if(ficha.infosFicha.id_ficha == FichaIdUser){
                        tela_carregamento(false)
                        criarFicha(ficha)
                    }else{return}
                })
            }).catch(err =>{
                console.log("Erro ao carregar fichas no console" + err)
            })
        }else{
            console.log("opa, erro")
        }
    })
   
}

function  alterar_campoDB(value, icon, ficha, index){
    ficha.valores_ficha[index].valor = value
    let fichaInfo = {
            infosFicha: ficha.infosFicha,
            valores_ficha:  ficha.valores_ficha
        }
    
    
    auth.onAuthStateChanged(user => {
        if(user){
            db.collection("Players").doc(user.uid).update({
                    Fichas: [fichaInfo]
                    
                }, {merge: true}).then(()=>{
                icon.classList.add("bxs-pencil")
            }).catch(err =>{
                console.log(err.message)
            })
        }else{
            console.log("opa, erro")
        }
    })
}

function delete_ficha(){
    tela_carregamento(true)
    auth.onAuthStateChanged(user => {
        if(user){
            db.collection("Players").doc(user.uid).update({
                Fichas: []
                    
                }).then(()=>{
                    tela_carregamento(false)
                window.location.href = "/console/console.html"
            }).catch(err =>{
                console.log(err.message)
            })
        }else{
            console.log("opa, erro")
        }
    })

}



function dadosJogar(input_value, campo, ficha){
    let arrayDados = input_value.toLowerCase().split("")
    let numDados = Number(arrayDados[0])
    let numProb = Number(arrayDados[2] + arrayDados[3])
    let result = []
    let resultado_str = ""

    if(arrayDados[1] !== "d" || arrayDados.length !== 4 || isNaN(arrayDados[0]) || numProb === NaN){
        console.log("erro")
    }else{
        let randomNumber
        for(let i = 0; i < numDados; i++){
            randomNumber = Math.floor(Math.random()*numProb)
            result.push(randomNumber)
        }
        let resultStyle = result.map((el=>{
            return `[${el}]`
        }))
        resultStyle.forEach(el=>{
            resultado_str += el
        })
        salvarHistoryDados(resultado_str, ficha)
        campo.innerHTML = "Dados:  " + resultado_str
        
    }

}

function salvarHistoryDados(dados, ficha){

    auth.onAuthStateChanged(user => {
        if(user){
            let userDoc = user.uid
            let docRef = db.collection("Players").doc(userDoc)
            docRef.get().then((doc)=>{
                let nomeUser = doc.data().user_infos.nome
                criarModelHist(nomeUser, dados)
            }).catch(err =>{
                console.log("Erro ao carregar fichas no console" + err)
            })
        }else{
            console.log("opa, erro")
        }
    })
}

function criarModelHist(nome, dados){
    let horaAtual = new Date().getHours() + ":" + new Date().getMinutes()
    let history_format = {
        nome: nome,
        hora: horaAtual,
        dado: dados
    }
    auth.onAuthStateChanged(user => {
        if(user){
            db.collection("History_Dados").doc("9B0JB1B5X9pGXX54grH0").update({
                history_dados: firebase.firestore.FieldValue.arrayUnion(history_format)

                },{merge: true}).then(()=>{
                    console.log("dados salvo no historico Global")
            }).catch(err =>{
                console.log(err.message)
            })
            db.collection("Players").doc(user.uid).update({
                history_dados: firebase.firestore.FieldValue.arrayUnion(history_format)

                },{merge: true}).then(()=>{
                    console.log("dados salvo no historico Player")
            }).catch(err =>{
                console.log(err.message)
            })
        }else{
            console.log("opa, erro")
        }
    })
}

