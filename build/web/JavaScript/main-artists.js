/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const artistsUrl = 'http://localhost:8081/api/artistas';
const artistsList = document.querySelector('#artist-section');

async function getArtist() {
    let elements = null;
    try {
        const response = await fetch(artistsUrl);
        console.log(response);
        const artists = await response.json();
        elements = Array.from(artists);
        console.log(elements);
        elements.forEach(element => {
            artistsList.innerHTML += `
            <div class="flex flex-col justify-start items-center mt-[50px]">
                    <img class="max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px] rounded-full" src="${element.foto}" alt="alt"/>
                    <p class="text-[24px] font-[500]">${element.nombre}</p>
            </div>
            
`
        })

    } catch (error) {
        console.log(`Hubo un error ${error}`)
    }
};

getArtist();