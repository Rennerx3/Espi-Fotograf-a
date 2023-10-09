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

/* Carousel */

function carousel() {
    const $slider = d.querySelector(".slider-slides");
    const $slaider = d.querySelector(".slider");
    

    d.addEventListener("click", (e) => {
        if(e.target.matches(".conteiner-D *")){
            $slider.textContent = '';
            

            if(!$slider.firstChild){
                fetch('http://localhost:3000/api/images')
                .then((res) =>{
                $slider.innerHTML = `<div class="slider-btns">
                    <a href="#" class="prev">&laquo;</a>
                    <a href="#" class="next">&raquo;</a>
                    </div>
                    <div class="div-exit">
                        <button id="cerrar-carousel" class="boton-cierre">X</button>
                    </div>
                        `;

                
                    
                return res.json();
                }) 
                .then((imgNames) => {

                    imgNames.forEach((imgName) =>{
                        const $sliderSlide = d.createElement('div');
                        $sliderSlide.classList.add('slider-slide');
                        const imgElement = d.createElement('img');
                        imgElement.src = `../../../img-op/${imgName}`;
                        
                        $sliderSlide.appendChild(imgElement);
                        $slider.appendChild($sliderSlide);
                    });
                    const $sliderSlides = d.querySelectorAll('.slider-slides .slider-slide');
                    
                    const $conteinerImages = d.querySelectorAll('.conteiner-D *');
                    
                    for(let i = 0; i < $sliderSlides.length; i++){
                        if($conteinerImages[i] === e.target){
                            
                            $sliderSlides[i].classList.add('is-active'); 
                        }
                    }
                    $slaider.classList.add('is-active');
                    configButtons();
                })
                .catch((err) => {
                    console.error('Error al obtener nombres de archivo: ', err);
                });
            }else{
                console.log('Ya se ha creado el elemento');
                configButtons();
            } 
             
        } 
    });

    function configButtons(){
        const $prevBtn = d.querySelector('.slider-btns .prev'),
        $nextBtn = d.querySelector('.slider-btns .next'),
        $exitBtn = d.querySelector('#cerrar-carousel'),
        $sliderSlides = d.querySelectorAll('.slider-slide');

        if($prevBtn && $nextBtn && $exitBtn){
            $prevBtn.addEventListener("click", (e) => {
                e.preventDefault();

                function encontrarActive() {
                    for(let i = 0; i < $sliderSlides.length; i++){
                        if($sliderSlides[i].classList.contains('is-active')){
                                return i;
                        }
                    }
                        return -1
                }
    
                let i = encontrarActive();
    
                
    
                $sliderSlides[i].classList.remove('is-active');
                
                i--;
            
                if (i < 0) {
                    i = $sliderSlides.length - 1;
                }
            
                $sliderSlides[i].classList.add('is-active');
            });

            $nextBtn.addEventListener("click", (e) => {
                e.preventDefault();

                function encontrarActive() {
                    for(let i = 0; i < $sliderSlides.length; i++){
                        if($sliderSlides[i].classList.contains('is-active')){
                                return i;
                        }
                    }
                        return -1
                }

                let i = encontrarActive();

                $sliderSlides[i].classList.remove('is-active');

                i++;

                if(i > $sliderSlides.length -1){
                    i = 0;
                }

                $sliderSlides[i].classList.add('is-active');

            });

            $exitBtn.addEventListener("click", (e) => {
                e.preventDefault();

                $slaider.classList.remove('is-active');
            })

        }
    }

}

d.addEventListener("DOMContentLoaded", e =>{
    bgMenu();
    headerFixed();
    validarFormulario();
    fetch('http://localhost:3000/api/images')
    .then((res) =>{
        
        return res.json();
    }) 
    .then((imgNames) => {
        const contImages = d.querySelector('.conteiner-D');
        console.log(imgNames);

        

        imgNames.forEach((imgName) =>{
            const imgElement = d.createElement('img');
            imgElement.src = `../../../img-op/${imgName}`;
            contImages.appendChild(imgElement);
        })
    })
    .catch((err) => {
        console.error('Error al obtener nombres de archivo: ', err);
    });
    carousel();
});




