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
const urlClientes = "http://localhost:8081/api/clientes";
console.log('funciona o no? xd');

let modal = document.getElementById("login_modal");

modal.addEventListener('click' , (event) => {
    if(event.target.classList.contains('close_login')){
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

function getLocalData() {
    if(localStorage.getItem('username') !== null) {
        show_user.style.display = 'flex';
        user_name.textContent = localStorage.getItem('username');
        btn_sign.style.display = 'none';
        btn_login.style.display = 'none';
   
    }else{
        show_user.style.display = 'none';
        btn_sign.style.display = 'flex';
        btn_login.style.display = 'flex';
    }
}

function logOut() {
    localStorage.removeItem('username');
    getLocalData();
}


function validarLogin() {
    let nombreUsuario = document.getElementById('usuario').value;
    let passwordUsuario = document.getElementById('password').value;
    let msg_error = document.getElementById("msg-error");
    let exists = false;
    getClientes().then((elementos) => {
    console.log('Clientes',elementos); // Accediendo al array de clientes
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
    request.onload = function() {
        let data1 = request.response;
        console.log("data1",data1);
        
        if(data1 == 1){
            msg_error.style.display = 'none';
            btn_login.style.display = 'none';
            btn_sign.style.display = 'none';
            show_user.style.display = 'flex';
            localStorage.setItem('username', nombreUsuario);
            user_name.textContent = nombreUsuario;
            exists = true;
            closeModal();
         
            
        }else if(exists == false){
            msg_error.style.display = 'flex';
            setTimeout(() => {
             msg_error.style.display = 'none'
            }, 2000)
        }
    };
    
    request.onerror = function() {
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
        
    }catch (error) {
         console.log(`Hubo un error ${error}`)
    }
 };

function closeModal() {
    modal.style.display = 'none';
}

getLocalData();