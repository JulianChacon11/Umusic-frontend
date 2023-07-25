/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
let songs_section = document.getElementById('songs-section');
const urlCanciones = "http://localhost:8081/api/canciones";

async function getApi() {
    let elementos = null;
    try {
        const response = await fetch(urlCanciones);
        console.log(response);
        const canciones = await response.json();
        elementos = Array.from(canciones);
        canciones.forEach(element => {
            songs_section.innerHTML += `
           <div class="flex flex-col items-center w-[175px] h-[253px] bg-[#161616] px[5%] rounded-xl hover:scale-[1.05]">
             <div class="h-[60%] w-[100%] p-[7%]">
                <img class="object-cover h-[100%] w-[100%] rounded-xl" src="${element.imagen}" alt="">
            </div>
            <h2 class="text-[14px] font-[800] text-center min-h-[40px]">${element.titulo}</h2>
            <p class="text-[12px] px-[10px] text-[#B3B3B3] py-[12px]">${element.artista.nombre}</p>
           </div>`
        });

    } catch (error) {
        console.log(`Hubo un error ${error}`)
    };
    /*let selected = null;
    itemsSection.addEventListener('click', (event) => {

        if (event.target.classList.contains('btn-compra')) {
          selected = elementos.filter((element) => {
                return element.title == event.target.parentElement.querySelector('.card-title').textContent
            })
            // console.log(selected);
            modal.style.display = 'flex';
            modalbody.innerHTML = `
            <div
            id = "card"
            class="flex flex-col w-[300px] bg-white h-[550px] rounded-xl items-center border-2 border-black border-opacity-50 mx-[2%] mt-[50px] sombra">
            <h1 id="card-title" class="card-title text-[20px] max-h-[80px] h-[80px] text-clip text-center overflow-y-scroll font-[400] my-[20px] text-[#525252] no-scrollbar ">${selected[0].title}</h1>
            <div class="h-[35%] w-[100%] px-[5%]">
            <img class=" object-contain h-[100%] w-[100%]" src="${selected[0].image}" alt="">
            </div>
            <p class="h-[200px] max-h-[100px] text-[14px] text-justify overflow-y-scroll no-scrollbar px-[10px] mt-[20px]">${selected[0].description}</p>
            <h2 class="text-[24px] text-[#525252] my-[10px] ">$<span class="precio">${selected[0].price}</span></h2>
            <div class="flex w-full gap-x-6 justify-center">
            <button id="btn-compra" class="bg-[#04724D] w-[100px] py-[10px] font-[500] btn-compra rounded-2xl hover:bg-opacity-75">Comprar</button>
            <button id="btn-cancelar" class="bg-[crimson] w-[90px] py-[10px] font-[500] btn-cancelar rounded-2xl hover:bg-opacity-75">Cancelar</button> 
            </div>
            
          </div>`

        }
        
           if (event.target.classList.contains('btn-cancelar')) {
                closeModal();
            } else if (event.target.classList.contains('btn-compra')) {  
               if(confirm(`Esta seguro que desea comprar ${selected[0].title}? `) == true) {
                localStorage.setItem('producto',JSON.stringify(selected))
                window.location.href = "/Html/compra.html";
               } 
            }modal.addEventListener('click', (event) => {
         
        })
    })*/
}

getApi();