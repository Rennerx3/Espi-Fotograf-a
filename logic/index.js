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

function headerFixed(){
    const $header = d.querySelector("header");

    d.addEventListener("scroll", e=>{
        if(window.scrollY > 90){
            $header.classList.add("is-active");
        }else{
            $header.classList.remove("is-active");
        }
    });
}

function validarFormulario(){
    const $form = d.querySelector(".contact-form"),
        $inputs = d.querySelectorAll(".contact-form [required]");

    $inputs.forEach((input) =>{
        const $span = d.createElement("span");
            $span.id = input.name;
            $span.textContent = input.title;
            $span.classList.add("contact-form-error", "none");
            input.insertAdjacentElement("beforebegin", $span);
    });

    d.addEventListener("keyup", (e) => {
        if(e.target.matches(".contact-form [required]")){
            let $input = e.target,
                pattern = $input.pattern;

            if(pattern && $input.value !== ""){
                let regex = new RegExp(pattern);
                return !regex.exec($input.value)
                ? d.getElementById($input.name).classList.add("is-active")
                : d.getElementById($input.name).classList.remove("is-active");
            }

            if(!pattern){
                return $input.value === ""
                ? d.getElementById($input.name).classList.add("is-active")
                : d.getElementById($input.name).classList.remove("is-active");
            }
        }             
    });
}


d.addEventListener("DOMContentLoaded", e =>{
    bgMenu();
    headerFixed();
    validarFormulario();
});




