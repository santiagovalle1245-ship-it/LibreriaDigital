const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

//Base de datos (en memoria)
let libros = [
    { id: 1, titulo: 'El Gran Gatsby', autor: 'F. Scott Fitzgerald' },
    { id: 2, titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez' },
    { id: 3, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes' }
];

// Operacion get para obtener todos los libros
app.get('/api/libros', (req, res) => {
    res.json(libros);
});

//operacion POST para agregar un nuevo libro
app.post('/api/libros', (req, res) => {
    const nuevoLibro = {
        id: libros.length + 1,
        titulo: req.body.titulo,
        autor: req.body.autor
    };
    libros.push(nuevoLibro);
    res.status(201).json(nuevoLibro);
});

//operacion PUT para actualizar un libro existente
app.put('/api/libros/:id', (req, res) => {
    const libroId = parseInt(req.params.id);
    const libro = libros.find(b => b.id === libroId);

    if (libro) {
        libro.titulo = req.body.titulo || libro.titulo;
        libro.autor = req.body.autor || libro.autor;
        res.json(libro);
    } else {
        res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
});

//operacion DELETE para eliminar un libro
app.delete('/api/libros/:id', (req, res) => {
    const libroId = parseInt(req.params.id);
    const index = libros.findIndex(b => b.id === libroId);

    if (index !== -1) {
        libros.splice(index, 1);
        res.json({ mensaje: 'Libro eliminado' });
    } else {
        res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});