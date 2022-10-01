function randomId(){
    let par = "ABCDEFGHIJKLMNOPQRSTUVWXYZabc12345".split("")
    let idR = []
    for( let i = 0; i < 30; i++){
        idR.push(par[Math.round(Math.random()*par.length)])
    }
    return idR.join("")
}




function enviar_dadosFichaDb(){
    let data_product = new Date().toLocaleDateString()

    let cod_validationFicha 

    const inputs_infosFicha = document.querySelectorAll(".input_values")
    const textAreas_infos = document.querySelectorAll(".textarea_values")

    const nome_fichaInput = document.querySelector("#nome_ficha")
    const input_imgFicha = document.querySelector(".input-image")
    const img_ficha = document.querySelector(".imageAm_perfil")

    let geralInputs = [...inputs_infosFicha, ...textAreas_infos]

    let inputsVazios = 0
    geralInputs.forEach((input)=>{
        if(!input.value){inputsVazios++}
    })
    if(inputsVazios === 0 && input_imgFicha.value && nome_fichaInput.value ){
        tela_carregamento(true)
        let user = auth.currentUser.uid
        let ficha_valores = []
        geralInputs.forEach((input)=>{
            let valor_ficha = {
                chave: input.id,
                valor: input.value,
                categoria: input.name
            }
            ficha_valores.push(valor_ficha)
        })
        db.collection("Players").doc(user).update(
            {
                Fichas: 
                [
                    {
                        infosFicha: {
                            nome_ficha: nome_fichaInput.value,
                            perfil_ficha: img_ficha.src,
                            time_create: data_product,
                            tipo_ficha: inf_FichaGonza.nome_model,
                            id_ficha:  randomId()

                        },
                        valores_ficha: ficha_valores,
                        history_dados:[]
                    }
                ]
            }
        ).then(()=>{
            tela_carregamento(false)
            console.log("Ficha adicionada")
            window.location.href = "/console/console.html";
        }).catch(err =>{
            console.log(err)
        })
    }else{
        alert("Algum campo vazio")
    }
    
}
    

