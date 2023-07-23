/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

let songsList = document.querySelector('#songs-list');
let urlSongs = 'http://localhost:8081/api/canciones';
const imgAudioPlayer = document.querySelector('#img-player');
const songNamePlayer = document.querySelector('#song-player');
const progressBar = document.querySelector('#reproductor-progress');
const audioPlayer = document.getElementById('audioPlayer');
const timeDisplay = document.querySelector('#reproductor-time');
const playIcon = document.querySelector('#play-icon');
const songsNumber = document.querySelector('#songs-number');
const songsDuration = document.querySelector('#songs-duration');
const songAutor = document.querySelector('#autor-player');
const progressBarContainer = document.querySelector('#progress-bar-container');
const backButton = document.querySelector('#go-back');
let songsArray = [];
console.log('xddd aa');


backButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

async function getSongs() {
    let elements = null;
    let counter = 0;
    let totalDuration = 0;
    try {
        const response = await fetch(urlSongs);
        console.log(response);
        
        const songs = await response.json();
        elements = Array.from(songs);
        console.log(elements[0].artista.nombre);
        elements.forEach(element => {
            songsArray.push(element);
            counter++;
            totalDuration += convertirADuracionEnSegundos(element.duracion);
            songsList.innerHTML += `
            <tr>
                <td class="px-6 py-4">
                    ${element.id}
                </td>
                <td class="px-6 py-4">
                   <button onclick="playSong('${element.url}'); toggleOnPlayer('${element.imagen}','${element.titulo}', '${element.artista.nombre}')">
                    <div class="flex items-center">
                        <img class="max-w-[45px] max-h-[45px] mr-[10px]" src="${element.imagen}"/>
                        <p>${element.titulo}</p>
                     </div>
                    </button>
                </td>
                <td class="px-6 py-4">
                    ${element.album}
                </td>
                <td class="px-6 py-4 text-center">
                   ${element.duracion}
                </td>
            </tr>
      
`       
        })

    } catch (error) {
        console.log(`Hubo un error ${error}`)
    }
    console.log(elements);
    const duracionFormateada = formatearDuracion(totalDuration);
    songsNumber.textContent = counter + " songs " + duracionFormateada;
  
    
}

function playSong(songUrl) {
   return new Promise((resolve) => {
    audioPlayer.src = `https://storage.cloud.google.com/umusic-storage/${songUrl}`;
        audioPlayer.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');

        // Escuchar el evento 'ended' para saber cuándo termina la canción
        audioPlayer.addEventListener('ended', () => {
          resolve(); // Resolvemos la promesa para indicar que la canción ha terminado
        });
        
        let isDraggingProgressBar = false;
    audioPlayer.addEventListener('timeupdate', () => {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = progress + '%';
            
        const currentTime = formatTime(audioPlayer.currentTime);
        timeDisplay.textContent = currentTime;
        
        if (!isDraggingProgressBar) {
            updateProgressBar();
          }
    });
    
    progressBarContainer.addEventListener('click', (event) => {
        const containerWidth = progressBarContainer.clientWidth;
        const clickPosition = event.offsetX;
        const progress = (clickPosition / containerWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    });

    progressBarContainer.addEventListener('mousedown', () => {
      isDraggingProgressBar = true;
    });
    
    document.addEventListener('mouseup', () => {
        if (isDraggingProgressBar) {
          isDraggingProgressBar = false;
          // Actualizar la barra de progreso una vez que el usuario ha terminado de arrastrar
          updateProgressBar();
        }
    });
  });
}

function toggleOnPlayer(image,title,autor) {
    imgAudioPlayer.src = image;
    songNamePlayer.textContent = title;
    songAutor.textContent = autor;
}

function togglePause() {
    if (audioPlayer.paused) {
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        audioPlayer.play(); // Si está pausado, despausar y continuar la reproducción
    } else {
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        audioPlayer.pause(); // Si está reproduciendo, pausar la canción
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function convertirADuracionEnSegundos(duracion) {
  const [minutos, segundos] = duracion.split(":");
  return parseInt(minutos, 10) * 60 + parseInt(segundos, 10);
}

function formatearDuracion(totalSegundos) {
  const minutos = Math.floor(totalSegundos / 60);
  const segundos = totalSegundos % 60;
  return `${minutos}min ${segundos.toString().padStart(2, '0')} s`;
}

function updateProgressBar() {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = progress + "%";
}
let response = getSongs();
console.log(songsArray);

async function playAllSongs(index = 0) {
  if (index < songsArray.length) {
    const songUrl = songsArray[index].url;
    toggleOnPlayer(songsArray[index].imagen, songsArray[index].titulo, songsArray[index].artista.nombre);
    await playSong(songUrl); // Esperar a que termine la reproducción de la canción actual
    playAllSongs(index + 1); // Llamar recursivamente para reproducir la siguiente canción
  }
}
