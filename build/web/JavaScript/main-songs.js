/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';


const urlSongs = 'http://localhost:8081/api/canciones';
const urlArtists = 'http://localhost:8081/api/artistas';
const urlCategories = "http://localhost:8081/api/generos";
const songsList = document.querySelector('#songs-list');
const modalCreate = document.querySelector('#modal');
const backButton = document.querySelector('#go-back');
const addSongButton = document.querySelector('#add-song');
const modalClose = document.querySelector('#modal-close');
const formSong = document.querySelector('#form');
let artistData;
let selectArtist = document.querySelector('#select-artist');
const selectCategory = document.querySelector('#select-category');
let artistsArr = [];

console.log('xd xd xd xd');
addSongButton.addEventListener('click', (event) => {
    modalCreate.style.display = 'flex';
});

   modalClose.addEventListener('click', () => {
    modalCreate.style.display = 'none';
 }); 



backButton.addEventListener('click', () => {
    window.location.href = "index.html";
});

formSong.addEventListener('submit', (event) => {
    event.preventDefault();
    createSong();
    console.log('xd');
});

// Hacer el llamado al endpoint para obtener la información del artista
selectArtist.addEventListener('change', async function() {     
    const selectedArtistId = this.value;
    
    if (selectedArtistId) {
    try {
      const response = await fetch(`http://localhost:8081/api/artistas/${selectedArtistId}`);
      artistData = await response.json();
      
      console.log(artistData);
    } catch (error) {
      console.log(`Hubo un error al obtener la información del artista: ${error}`);
    }
  }
});

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
                            <button class="hover:text-[blue] hover:scale-[1.2]" onclick="editModal(${element.id},'${element.nombre}','${element.descripcion}')" disabled ><i class="fa-solid fa-gear "></i></button>
                            <button class="hover:text-[crimson] hover:scale-[1.2]" onclick="deleteSong(${element.id})"><i class="fa-solid fa-trash"></i></button>
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

function createSong() {
    console.log(artistData);
    let songName = document.querySelector('#song-name').value;
    let songArtist = document.querySelector('#select-artist').value;
    let songAlbum = document.querySelector('#song-album').value;
    let songDuration = document.querySelector('#song-duration').value;
    let songGenre = document.querySelector('#select-category').value;
    let songUrl = document.querySelector('#song-url').value;
    let songImg = document.querySelector('#song-img').value;
    
    const data = {
        titulo: songName,
        artista: {
            id: artistData.id,
            nombre: artistData.nombre,
            nacionalidad: artistData.nacionalidad,
            foto: artistData.foto,
            fecha_nacimiento: artistData.fecha_nacimiento
        },
        duracion: songDuration,
        album: songAlbum,
        id_genero: songGenre,
        url: songUrl,
        imagen: songImg
    };
    
    fetch(urlSongs, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
                .then(response => {
                    if (response.ok) {
                        console.log('Datos enviados correctamente.');
                        alert('Canción creada exitosamente');
                        songsList.innerHTML = '';
                        getSongs();
                        closeModal();
                        formSong.reset();
                    } else {
                        throw new Error('Error en la solicitud.');
                    }
                })
                .catch(error => {
                    console.error(error);
                });
}

async function deleteSong(id) {
  const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta canción?');
  if (confirmacion) {
    const url = `http://localhost:8081/api/canciones/{id}?id=${id}`;
    
    fetch(url, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        console.log('Registro eliminado con éxito');
        songsList.innerHTML = '';
        getSongs();
        // Realizar cualquier acción adicional después de eliminar el registro
      } else {
        console.error('Error al eliminar el registro:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error al eliminar el registro:', error);
    });
  }
}

function closeModal() {
    modalCreate.display = 'none';
}


getSongs();
getArtists();
getCategories();
console.log(artistsArr);


