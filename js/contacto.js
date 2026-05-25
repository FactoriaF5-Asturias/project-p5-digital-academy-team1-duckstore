const formulario = document.getElementById('formulario-contacto');
formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const datosFormulario = {
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        mensaje: document.getElementById('mensaje').value.trim(),
        capturadoEn: new Date().toLocaleString('es-ES')
    };
    console.log('Mensaje del formulario recibido:' , datosFormulario);
    formulario.reset();
});