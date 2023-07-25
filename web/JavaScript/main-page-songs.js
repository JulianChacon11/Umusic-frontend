/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
let songs_section = document.getElementById('songs-section');
let urlSongs = 'http://localhost:8081/api/canciones';
let reproducer = document.querySelector('#reproducer');
let mustLog = document.querySelector('#must-log');

async function getApi() {
    let elementos = null;
    try {
        const response = await fetch(urlSongs);
        console.log(response);
        const canciones = await response.json();
        elementos = Array.from(canciones);
        canciones.forEach(element => {
            songs_section.innerHTML += `
           <div class="flex flex-col items-center w-[175px] h-[253px] bg-[#161616] px[5%] rounded-xl hover:scale-[1.05]">
             <div class="h-[60%] w-[100%] p-[7%]">
                <img class="object-cover h-[100%] w-[100%] rounded-xl" src="${element.imagen}" alt="">
            </div>
            <button onclick="playSong('${element.url}'); toggleOnPlayer('${element.imagen}','${element.titulo}', '${element.artista.nombre}')">
                <h2 class="text-[14px] font-[800] text-center min-h-[40px]">${element.titulo}</h2>
            </button>
            <p class="text-[12px] px-[10px] text-[#B3B3B3] py-[12px]">${element.artista.nombre}</p>
           </div>`
        });

    } catch (error) {
        console.log(`Hubo un error ${error}`)
    }
    ;
}

//Reproductor

const imgAudioPlayer = document.querySelector('#img-player');
const songNamePlayer = document.querySelector('#song-player');
const progressBar = document.querySelector('#reproductor-progress');
const audioPlayer = document.getElementById('audioPlayer');
const timeDisplay = document.querySelector('#reproductor-time');
const playIcon = document.querySelector('#play-icon');
const songsDuration = document.querySelector('#songs-duration');
const songAutor = document.querySelector('#autor-player');
const progressBarContainer = document.querySelector('#progress-bar-container');

function playSong(songUrl) {
    if (localStorage.getItem('username') !== null) {
        reproducer.style.display = 'flex';
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
    }else{
        mustLog.style.display = 'flex';
        setTimeout(() => {
            mustLog.style.display = 'none';
        }, "3000")
    }

}


function toggleOnPlayer(image, title, autor) {
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

function updateProgressBar() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = progress + "%";
}

getApi();