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
    setTimeout(() => {document.querySelector(".tela_preload").remove()}, 3000);
    verifyUserConnect()
})

var purecookieTitle="Cookies.", 
    purecookieDesc="Ao usar este site, você aceita automaticamente que usamos cookies.",
    purecookieLink='<a href="https://www.cssscript.com/privacy-policy/" target="_blank">Pelo oque?</a>',
    purecookieButton="Entendido"
    
function pureFadeIn(e,o){
    var i=document.getElementById(e)
    i.style.opacity=0,
    i.style.display=o||"block",
    function e(){
        var o=parseFloat(i.style.opacity)
        (o+=.02)>1||(i.style.opacity=o,requestAnimationFrame(e))
    }()}
    function pureFadeOut(e){
        var o=document.getElementById(e)
        o.style.opacity=1,
        function e(){
            (o.style.opacity-=.02)<0?o.style.display="none":requestAnimationFrame(e)
        }()
    }
    function setCookie(e,o,i){
        var t=""
        if(i){
            var n=new Date
            n.setTime(n.getTime()+24*i*60*60*1e3),
            t="; expires="+n.toUTCString()
        }
        document.cookie=e+"="+(o||"")+t+"; path=/"
    }
    function getCookie(e){
        for(var o=e+"=",i=document.cookie.split(";"),t=0;t<i.length;t++){
            for(var n=i[t];" "==n.charAt(0);)n=n.substring(1,n.length)
            if(0==n.indexOf(o))return n.substring(o.length,n.length)
        }
        return null
    }
    function eraseCookie(e){
        document.cookie=e+"=; Max-Age=-99999999;"
    }
    function cookieConsent(){
        getCookie("purecookieDismiss")||(document.body.innerHTML+='<div class="cookieConsentContainer" id="cookieConsentContainer"><div class="cookieTitle"><a>'+purecookieTitle+'</a></div><div class="cookieDesc"><p>'+purecookieDesc+" "+purecookieLink+'</p></div><div class="cookieButton"><a onClick="purecookieDismiss();">'+purecookieButton+"</a></div></div>",
        pureFadeIn("cookieConsentContainer"))
    }
    function purecookieDismiss(){
        setCookie("purecookieDismiss","1",7),
        pureFadeOut("cookieConsentContainer")
    }
    window.onload=cookieConsent()