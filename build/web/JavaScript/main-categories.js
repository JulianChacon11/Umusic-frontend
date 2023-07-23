/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

let cat_list = document.getElementById('cat-list');
let urlCategories = "http://localhost:8081/api/generos";
let modal_close = document.getElementById('modal-close');
let modal_add = document.getElementById('modal-add');
let modal = document.getElementById('modal');
let btn_add = document.getElementById('btn-add');
let form = document.getElementById('form');
const backButton = document.querySelector('#go-back');
let selectedID = null;
console.log('xd no queeee aa');
modal.addEventListener('click', (event) => {
    if (event.target.id == 'modal-close') {
        modal.style.display = 'none';
        console.log(event);
    }
});

function openModal(){
    modal.style.display = 'flex';
}

backButton.addEventListener('click', () => {
    window.location.href = "index.html";
});

btn_add.addEventListener('click', (event) => {
    openModal();
});

form.addEventListener('click', (event) => {
    event.preventDefault();
    
    if (event.target.id == 'modal-add') {
        let cat_name = document.getElementById('cat-name').value;
        let cat_des = document.getElementById('cat-description').value;

        const data = {
            nombre: cat_name,
            descripcion: cat_des
        };
        console.log(data);
        fetch(urlCategories, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
                .then(response => {
                    if (response.ok) {
                        console.log('Datos enviados correctamente.');
                        alert('Categoria creada exitosamente');
                        closeModal();
                        resetPage();
                    } else {
                        throw new Error('Error en la solicitud.');
                    }
                })
                .catch(error => {
                    console.error(error);
                });

    }else if(event.target.id == 'modal-edit') {
        
        let cat_name = document.getElementById('cat-name').value;
        let cat_des = document.getElementById('cat-description').value;
        
        var data = {
            id: selectedID,
            nombre: cat_name,
            descripcion: cat_des
        };

  // Realizar la solicitud HTTP para editar el registro
        fetch('http://localhost:8081/api/generos', {
         method: 'PUT', 
         headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Convertir los datos a formato JSON
        })
        .then(response => {
            if (response.ok) {
            alert('Registro editado con éxito');
            form.reset();
            closeModal();
            cat_list.innerHTML = ' ';
            getCategories();
            modal_add.id = 'modal-add';
            let title = document.getElementById('modal-title');
            title.textContent = 'Add new Category';
            
            modal_add.textContent = 'Add new category';
    
        } else {
        throw new Error('Error al editar el registro');
      }
       })
       .catch(error => {
          console.error('Error:', error);
    });
    }

});

function resetModal(){
    form.reset();
}

function closeModal() {
    modal.style.display = 'none';
}

async function getCategories() {
    let elements = null;
    try {
        const response = await fetch(urlCategories);
        console.log(response);
        const categories = await response.json();
        elements = Array.from(categories);
        console.log(elements);
        elements.forEach(element => {
            cat_list.innerHTML += `
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700" id="cat-list">
                  <td class="px-6 py-4">
                     ${element.id}
                  </td>
                   <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                       ${element.nombre}
                   </th>
                   <td class="px-6 py-4">
                       ${element.descripcion}
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

async function deleteCategory(id) {
  const confirmacion = confirm('¿Estás seguro de que deseas eliminar este registro?');
  if (confirmacion) {
    const url = `http://localhost:8081/api/generos/{id}?id=${id}`;
    
    fetch(url, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        console.log('Registro eliminado con éxito');
        cat_list.innerHTML = '';
        getCategories();
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

function editModal(id, nombre, descripcion) {
    let title = document.getElementById('modal-title');
    title.textContent = 'Edit Category';
    let cat_name = document.getElementById('cat-name');
    let cat_des = document.getElementById('cat-description');
    cat_name.value = nombre;
    cat_des.value = descripcion;
    modal_add.id = 'modal-edit';
    modal_add.textContent = 'Edit category';
    selectedID = id;
    openModal();
}

function resetPage(){
    location.reload();
}



getCategories();


    

