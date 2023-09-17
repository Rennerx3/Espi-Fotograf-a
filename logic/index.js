const d = document;

function bgMenu(){
    const $btn = d.getElementById("btn"),
          $panel = d.querySelector(".panel");
          
    d.addEventListener("click", (e) =>{
        if(e.target.matches("#btn") || (e.target.matches("#btn *"))){
            $btn.classList.toggle("is-active");
            $panel.classList.toggle("is-active");
        }

        if(e.target.matches(".menu *")){
            $panel.classList.remove("is-active");
        }
    });      

}



d.addEventListener("DOMContentLoaded",bgMenu);