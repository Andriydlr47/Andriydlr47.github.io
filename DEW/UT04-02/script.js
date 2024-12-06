const DOM = {
    frm: document.getElementById("frm"),
    mostrarContrasena: document.getElementById("mostrarContrasena"),
    campos: {
        nombreUsuario: document.getElementById("NombreUsuario"),
        contrasena: document.getElementById("Contrasena"),
        nombre: document.getElementById("Nombre"),
        apellidos: document.getElementById("Apellidos"),
        telefono: document.getElementById("Telefono"),
        condigPostal: document.getElementById("CodigoPostal"),
        DniNie: document.getElementById("TipoDocumento"),
        anioNacimiento: document.getElementById("anioNacimiento"),
        titulo: document.getElementById("PublicacionTitulo"),
        descripcion: document.getElementById("PublicacionDescripcion")        
    },
    aficiones: {
        musica: document.getElementById("musica"),
        deporte: document.getElementById("deporte"),
        videoJuegos: document.getElementById("videoJuegos"),
        manualidades: document.getElementById("manualidades"),
        artes: document.getElementById("artes"),
        lectura: document.getElementById("lectura")
    }
};

// Contraseña
mostrarContrasena.addEventListener("change", function () {
    const passwordInput = document.getElementById('Contrasena');
    passwordInput.type = this.checked ? "text" : "password";
});

function agregarOpcionesAlSelect() {
    const select = document.getElementById("anioNacimiento");

    for (let año = 1921; año <= 2010; año++) {
        const option = document.createElement('option');
        option.value = año; 
        option.textContent = año; 
        select.appendChild(option);
    }
}

// LLamar a la función de agregar opciones
window.onload = function() {
    agregarOpcionesAlSelect();
};

// Conteo descripción y título
const tituloDiv = document.getElementById('tituloDiv');
const descripcionDiv = document.getElementById('descripcionDiv');

const tituloP = document.createElement('p');
tituloDiv.appendChild(tituloP);

const descripcionP = document.createElement('p');
descripcionDiv.appendChild(descripcionP);

function actualizarConteo(input, pElement, maxLength) {
    const length = input.value.length;
    pElement.textContent = `${length}/${maxLength}`;
    pElement.style.display = length > 0 ? 'block' : 'none'; // Mostrar u ocultar el párrafo
}

document.getElementById('PublicacionTitulo').addEventListener('input', function() {
    actualizarConteo(this, tituloP, 15);
});

document.getElementById('PublicacionDescripcion').addEventListener('input', function() {
    actualizarConteo(this, descripcionP, 120);
});

function conteocheked() {
    let conteo = 0;

    // Convert the DOM.aficiones object to an array and iterate
    Object.values(DOM.aficiones).forEach(element => {
        if (element.checked) {
            conteo++;
        }
    });
    return conteo;
}

// Actualizar el campo oculto de Aficiones
function actualizarAficiones() {
    const aficionesSeleccionadas = [];
    Object.values(DOM.aficiones).forEach(element => {
        if (element.checked) {
            aficionesSeleccionadas.push(element.value);
        }
    });
    document.querySelector('input[name="Aficiones"]').value = aficionesSeleccionadas.join(', ');
}

// Llamar a la función al cambiar el estado de los checkboxes
Object.values(DOM.aficiones).forEach(element => {
    element.addEventListener('change', actualizarAficiones);
});

// Función para limpiar mensajes de error
function limpiarMensajeError(campo) {
    const errorDiv = campo.closest('.error-message'); // Buscar el div de error correspondiente
    const errorMessages = errorDiv.querySelectorAll(".error-text");
    errorMessages.forEach(msg => msg.remove()); // Eliminar mensajes de error previos
}

// Agregar evento input a cada campo
for (const key in DOM.campos) {
    const campo = DOM.campos[key];
    campo.addEventListener('input', function() {
        // Limpiar mensaje de error al escribir en el campo
        limpiarMensajeError(campo);
    });
}

// Agregar evento change a cada checkbox de aficiones
Object.values(DOM.aficiones).forEach(element => {
    element.addEventListener('change', function() {
        // Limpiar mensaje de error al cambiar el estado de las aficiones
        const aficionesSeleccionadas = conteocheked(); // Llama a la función que cuenta las aficiones seleccionadas
        const aficionesSpan = document.getElementById("Aficiones");
        const errorMessages = aficionesSpan.querySelectorAll(".error-text");
        
        // Si hay mensajes de error, eliminarlos si la validación es correcta
        if (aficionesSeleccionadas >= 2) {
            errorMessages.forEach(msg => msg.remove());
        }
    });
});

DOM.frm.addEventListener("submit", (e) => {
    // Limpiar mensajes de error anteriores
    const errorMessages = document.querySelectorAll(".error-message .error-text");
    errorMessages.forEach(msg => msg.remove()); // Eliminar mensajes de error previos

    let isValid = true; // Variable para verificar la validez

    // Validar campos requeridos
    for (const key in DOM.campos) {
        const campo = DOM.campos[key];
        const errorDiv = campo.closest('.error-message'); // Buscar el div de error correspondiente

        if (campo.validationMessage != "") {
            isValid = false;

            // Crear un nuevo elemento para mostrar el mensaje de error
            const errorMessage = document.createElement("div");
            errorMessage.className = "error-text"; // Asignar una clase para el mensaje de error
            errorMessage.style.color = "red"; // Personalizar el estilo del mensaje
            errorMessage.textContent = `${campo.previousElementSibling.textContent} es obligatorio.`; // Mensaje personalizado
            
            // Añadir el mensaje de error al div correspondiente
            if (errorDiv) {
                errorDiv.appendChild(errorMessage);
            }
        } else {
            campo.classList.remove('error'); // Remover clase de error si está lleno
        }
    }
    
    if(document.getElementById("errorDivFuera"))
    {
        document.getElementById("errorDivFuera").remove();
    }
    const errorDivFuera = document.createElement("div"); // Buscar el div de error correspondiente
    errorDivFuera.id = "errorDivFuera";

    for (const key in DOM.campos) {
        const campo = DOM.campos[key];

        if (campo.validationMessage != "") {
            isValid = false;

            // Crear un nuevo elemento para mostrar el mensaje de error
            const errorMessage = document.createElement("div");
            errorMessage.className = "error-text"; // Asignar una clase para el mensaje de error
            errorMessage.style.color = "red"; // Personalizar el estilo del mensaje
            errorMessage.textContent = `${campo.name}: ${campo.validationMessage}`; // Mensaje personalizado
            
            // Añadir el mensaje de error al div correspondiente
            if (errorDivFuera) {
                errorDivFuera.appendChild(errorMessage);
            }
        } else {
            campo.classList.remove('error'); // Remover clase de error si está lleno
        }
    }
    
    document.body.appendChild(errorDivFuera);
    document.body.className = "flex";

    function validarDniNie() {
        const dniNieInput = DOM.campos.DniNie.value.trim().toUpperCase();
        const tipoDocumento = document.getElementById('DniNie').value;
    
        if (tipoDocumento === 'DNI') {
            // Validar formato: 8 dígitos seguidos de una letra
            const dniRegex = /^\d{8}[A-Z]$/;
            if (!dniRegex.test(dniNieInput)) {
                return false; // Formato incorrecto
            }
    
            const numero = dniNieInput.slice(0, 8);
            const letra = dniNieInput.charAt(8);
    
            // Calcular letra correspondiente
            const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
            const letraCorrecta = letras.charAt(parseInt(numero) % 23);
    
            return letra === letraCorrecta; // Comprobar si la letra es correcta
    
        } else if (tipoDocumento === 'NIE') {
            // Validar formato: 1 letra (X, Y, Z) + 7 dígitos + 1 letra
            const nieRegex = /^[XYZ]\d{7}[A-Z]$/;
            if (!nieRegex.test(dniNieInput)) {
                return false; // Formato incorrecto
            }
    
            const letraInicial = dniNieInput.charAt(0);
            let numero = dniNieInput.slice(1, 8);
            const letraFinal = dniNieInput.charAt(8);
    
            // Reemplazar la letra inicial por un número
            if (letraInicial === 'X') {
                numero = '0' + numero;
            } else if (letraInicial === 'Y') {
                numero = '1' + numero;
            } else if (letraInicial === 'Z') {
                numero = '2' + numero;
            }
    
            // Calcular letra correspondiente
            const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
            const letraCorrecta = letras.charAt(parseInt(numero) % 23);
    
            return letraFinal === letraCorrecta; // Comprobar si la letra es correcta
        }
    
        return false; // Tipo de documento no válido
    }
    
    // Validar DNI/NIE
    const dniNieValido = validarDniNie();
    if (!dniNieValido) {
        isValid = false;
        const errorMessage = document.createElement("div");
        errorMessage.className = "error-text";
        errorMessage.style.color = "red";
        errorMessage.textContent = `El DNI/NIE no es válido. Asegúrate de que tenga el formato correcto.`;
        
        const dniNieDiv = document.getElementById("DniNie").closest('.error-message');
        if (dniNieDiv) {
            dniNieDiv.appendChild(errorMessage);
        }
    }
    
    // Validar aficiones seleccionadas
    const aficionesSeleccionadas = conteocheked(); // Llama a la función que cuenta las aficiones seleccionadas
    if (aficionesSeleccionadas < 2) {
    // Verificar si ya existe un mensaje de error
    const aficionesSpan = document.getElementById("Aficiones");
    const existingErrorMessages = aficionesSpan.querySelectorAll(".error-text");
    
    if (existingErrorMessages.length === 0) { // Solo agregar si no hay mensajes de error
        // Crear un nuevo elemento para mostrar el mensaje de error
        const errorMessage = document.createElement("div");
        errorMessage.className = "error-text"; // Asignar una clase para el mensaje de error
        errorMessage.style.color = "red"; // Personalizar el estilo del mensaje
        errorMessage.textContent = `Debes seleccionar al menos 2 aficiones.`; // Mensaje personalizado
        
        // Añadir el mensaje de error a un contenedor específico
        aficionesSpan.appendChild(errorMessage);
    }
        isValid = false;
    }


    // Si todo es válido, se permite el envío del formulario
    if (!isValid) {
        e.preventDefault(); // Evitar el envío del formulario si hay errores
    }
});

 
