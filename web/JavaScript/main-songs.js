/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict'


const urlSongs = 'http://localhost:8081/api/canciones';
const urlArtists = 'http://localhost:8081/api/artistas';
const urlCategories = "http://localhost:8081/api/generos";
const songsList = document.querySelector('#songs-list');
const modalCreate = document.querySelector('#modal');
const backButton = document.querySelector('#go-back');
const addSongButton = document.querySelector('#add-song');
const modalClose = document.querySelector('#modal-close');
let selectArtist = document.querySelector('#select-artist');
const selectCategory = document.querySelector('#select-category');
let artistsArr = [];

console.log('xd');
addSongButton.addEventListener('click', (event) => {
    modalCreate.style.display = 'flex';
})

modalClose.addEventListener('click', () => {
    modalCreate.style.display = 'none';
})

backButton.addEventListener('click', () => {
    window.location.href = "index.html";
})

async function getArtists() {
    let elements = null;
    try{
        const response = await fetch(urlArtists);
        console.log(response);
        const artists = await response.json();
        elements = Array.from(artists);
        console.log(elements);
        elements.forEach(element => {
            artistsArr.push(element);
            let option = document.createElement('option');
            option.textContent = element.nombre;
            option.value = element.id;
            selectArtist.appendChild(option);
        })
        
    }catch (error) {
        console.log(`Hubo un error ${error}`)
    }
}

async function getSongs() {
    let elements = null;
    try {
        const response = await fetch(urlSongs);
        console.log(response);
        const songs = await response.json();
        elements = Array.from(songs);
        console.log(elements);
        elements.forEach(element => {
            songsList.innerHTML += `
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700" id="cat-list">
                  <td class="px-6 py-4">
                     ${element.id}
                  </td>
                   <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       ${element.titulo}
                   </th>
                   <td class="px-6 py-4">
                       ${element.artista.nombre}
                    </td>
                    <td class="px-6 py-4">
                       ${element.album}
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex gap-2 justify-center text-[18px]">
                            <button class="hover:text-[blue] hover:scale-[1.2]" onclick="editModal(${element.id},'${element.nombre}','${element.descripcion}')"><i class="fa-solid fa-gear "></i></button>
                            <button class="hover:text-[crimson] hover:scale-[1.2]" onclick="deleteCategory(${element.id})"><i class="fa-solid fa-trash"></i></button>
                        </div>
                     </td>
            </tr>
`
        })

    } catch (error) {
        console.log(`Hubo un error ${error}`)
    }
};


async function getCategories() {
    let elements = null;
    try{
        const response = await fetch(urlCategories);
        console.log(response);
        const categories = await response.json();
        elements = Array.from(categories);
        console.log(elements);
        elements.forEach(element => {
            let option = document.createElement('option');
            option.textContent = element.nombre;
            option.value = element.id;
            selectCategory.appendChild(option);
        })
        
    }catch (error) {
        console.log(`Hubo un error ${error}`)
    }
}

getSongs();
getArtists();
getCategories();
console.log(artistsArr);


