/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


let close_login = document.getElementById("close_login");
let btn_login = document.getElementById("btn-login");
let btn_sign = document.getElementById("btn-sign");
let btn_login2 = document.getElementById("btn_login2");
let show_user = document.getElementById("show-user");
let user_name = document.getElementById("user-name");
let main_options = document.getElementById("main-options");
let logOutBtn = document.getElementById('log-out');
let signForm = document.querySelector('#form-sign');
let signModal = document.querySelector('#sign-modal');
const urlClientes = "http://localhost:8081/api/clientes";
let loged = false;
let modalLog = document.querySelector('#must-log');
console.log('funciona o no? xd');

let modal = document.getElementById("login_modal");

modal.addEventListener('click', (event) => {
    if (event.target.classList.contains('close_login')) {
        closeModal();
    }
});

btn_login.addEventListener('click', (event) => {
    modal.style.display = 'flex';
    console.log('holaaa xd');
});

btn_login2.addEventListener('click', (event) => {
    validarLogin();
});

btn_sign.addEventListener('click', (event) => {
    signModal.style.display = 'flex'
});

signModal.addEventListener('click', (event) => {
    if (event.target.classList.contains('close_login')) {
        closeModal();
    }
});

document.getElementById("birth-user").addEventListener("input", function () {
    var inputDate = this.value;
    var formattedDate = formatToYYYYMMDD(inputDate);
    this.value = formattedDate;
});

signForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById("name-user").value;
    const lastname = document.getElementById("lastname-user").value;
    const birthDate = document.getElementById("birth-user").value;
    const email = document.getElementById("user-email").value;
    const phoneNumber = document.getElementById("user-phone").value;
    const genero = document.querySelector('input[name="genero"]:checked').value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password-sign").value;

    const data = {
        nombre: name,
        apellido: lastname,
        fecha_nacimiento: birthDate,
        email: email,
        telefono: phoneNumber,
        genero: genero,
        nacionalidad: 'Colombia',
        id_rol: 1,
        username: username,
        password: password
    };

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };


    fetch(urlClientes, requestOptions)
            .then(response => {
                if (response.status === 201) {
                        console.log('Cliente creado exitosamente.');
                        alert('Usuario registrado correctamente');
                        signForm.reset();
                        signModal.style.display = 'none';
                    } else {
                        console.error('Error al crear el cliente. Código de respuesta:', response.status);
                        // Aquí puedes manejar el caso de error si la creación falló
                    }
                    
                     response.json();
            }).then(data => {
                console.log('Respuesta del servidor:', data);
                // Aquí puedes manejar la respuesta del servidor como desees
            })
            .catch(error => console.error('Error al enviar la petición:', error));
});




function getLocalData() {
    if (localStorage.getItem('username') !== null) {
        loged = true;
        show_user.style.display = 'flex';
        user_name.textContent = localStorage.getItem('username');
        btn_sign.style.display = 'none';
        btn_login.style.display = 'none';

    } else {
        show_user.style.display = 'none';
        btn_sign.style.display = 'flex';
        btn_login.style.display = 'flex';
    }
}

function logOut() {
    localStorage.removeItem('username');
    loged = false;
    getLocalData();
}


function validarLogin() {
    let nombreUsuario = document.getElementById('usuario').value;
    let passwordUsuario = document.getElementById('password').value;
    let msg_error = document.getElementById("msg-error");
    let exists = false;
    getClientes().then((elementos) => {
        console.log('Clientes', elementos); // Accediendo al array de clientes
    }).catch((error) => {
        console.error(`Hubo un error ${error}`); // Mostrando el mensaje de error
    });

    console.log(nombreUsuario);
    console.log(passwordUsuario);


    let data = {
        'username': nombreUsuario,
        'password': passwordUsuario,
    };
    console.log(data);
    console.log('xdd')
    let request = sendRequest('api/clientes/loginclient', 'POST', data);
    request.onload = function () {
        let data1 = request.response;
        console.log("data1", data1);

        if (data1 == 1) {
            msg_error.style.display = 'none';
            btn_login.style.display = 'none';
            btn_sign.style.display = 'none';
            show_user.style.display = 'flex';
            localStorage.setItem('username', nombreUsuario);
            user_name.textContent = nombreUsuario;
            exists = true;
            closeModal();


        } else if (exists == false) {
            msg_error.style.display = 'flex';
            setTimeout(() => {
                msg_error.style.display = 'none'
            }, 2000)
        }
    };

    request.onerror = function () {
        alert("Error al recuperar los datos.");
    };
}

async function getClientes() {
    let elementos = null;
    try {
        const response = await fetch(urlClientes);
        console.log(response);
        const clientes = await response.json();
        elementos = Array.from(clientes);
        console.log(elementos);

    } catch (error) {
        console.log(`Hubo un error ${error}`)
    }
}
;

function closeModal() {
    modal.style.display = 'none';
    signModal.style.display = 'none';
}



function formatToYYYYMMDD(dateString) {
    var date = new Date(dateString);
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
}

function redirect(page) {
    getLocalData();
    if(loged) {
        switch(page) {
            case 'categories.html':
                window.location.href = "categories.html";
                break;
            
            case 'admin-songs.html':
                window.location.href = "admin-songs.html";
                break;
                
            case 'songs.html':
                window.location.href = 'songs.html';
                break;
            
            case 'artist.html':
                window.location.href = 'artist.html';
                break;
                
            default:
                break;
        }
    }else{
        modalLog.style.display = 'flex';
        setTimeout(() => {
             modalLog.style.display = 'none';
        }, 1500);
    }
}

getLocalData();