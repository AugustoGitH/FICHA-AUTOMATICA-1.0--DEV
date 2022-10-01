const focus_eye = document.querySelectorAll(".focus_eye")
const vision_pass = document.querySelectorAll(".vision_pass")

function focusInputPass(el){
    let iconVision = el.parentNode.querySelector("i")
    iconVision.classList.add("iconVision_visible")
}
function pass_visible(el){
    let input = el.parentNode.querySelector("input")
    if(input.type === "text"){
        input.type = "password"
        el.style.color = "black"
    }else{
        input.type = "text"
        el.style.color = "red"
    }
}




