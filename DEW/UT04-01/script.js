const tituloDiv = document.getElementById('tituloDiv');
const descripcionDiv = document.getElementById('descripcionDiv');
let tituloP = document.createElement('p');
tituloP.className ='tituloP';
let descripcionP = document.createElement('p');
descripcionP.className= 'descripcionP';

function mostrarContraseña() {
    const passwordInput = document.getElementById('contraseña');
    const checkbox = document.getElementById('mostrarContraseña');
    passwordInput.type = checkbox.checked ? 'text' : 'password';
}

function conteoTitulo() {
    const titleInput = document.getElementById('titulo');
    const titleCount = document.getElementById('titleCount');
    tituloP.textContent = `${titleInput.value.length}/15`;
    tituloDiv.appendChild(tituloP);
}

function conteoDescripcion() {
    const descriptionInput = document.getElementById('descripcion');
    const descriptionCount = document.getElementById('descriptionCount');
    descripcionP.textContent = `${descriptionInput.value.length}/120`;
    descripcionDiv.appendChild(descripcionP);
}
