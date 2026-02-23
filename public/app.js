const formulario = document.getElementById('formulario-libro');
const listaLibros = document.getElementById('lista-libros');

// GET: Cargar libros
async function obtenerLibros() {
    const respuesta = await fetch('/api/libros');
    const libros = await respuesta.json();

    listaLibros.innerHTML = '';

    libros.forEach(libro => {
        const li = document.createElement('li');

        li.innerHTML = `
            <span>${libro.titulo} - ${libro.autor}</span>
            <button class="btn-editar" onclick="editarLibro(${libro.id}, '${libro.titulo}', '${libro.autor}')">Editar</button>
            <button class="btn-eliminar" onclick="eliminarLibro(${libro.id})">Eliminar</button>
        `;
        listaLibros.appendChild(li);
    });
}

// POST: Agregar libro
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;

    await fetch('/api/libros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, autor })
    });

    formulario.reset();
    obtenerLibros();
});

// DELETE: Eliminar libro
async function eliminarLibro(id) {
    await fetch(`/api/libros/${id}`, { method: 'DELETE' });
    obtenerLibros();
}

// PUT: Editar libro 
async function editarLibro(id, tituloActual, autorActual) {
    const nuevoTitulo = prompt("Edita el título:", tituloActual);
    const nuevoAutor = prompt("Edita el autor:", autorActual);

    if (nuevoTitulo && nuevoAutor) {
        await fetch(`/api/libros/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo: nuevoTitulo, autor: nuevoAutor })
        });
        obtenerLibros();
    }
}

obtenerLibros();