const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const app = express();
const PORT = 3000;

//1. Define your GraphQL schema
const typeDefs = gql`
type Libro {
  id: ID!
  titulo: String!
  autor: String!
}

type Query {
  libros: [Libro] #obtener todos los libros
  libro(id: ID!): Libro #obtener un libro por su ID
}

type Mutation {
  agregarLibro(titulo: String!, autor: String!): Libro #agregar un nuevo libro
  actualizarLibro(id: ID!, titulo: String, autor: String): Libro #actualizar un libro por su ID
  eliminarLibro(id: ID!): Libro #eliminar un libro por su ID
}
`;

//Base de datos (en memoria)
let libros = [
    { id: 1, titulo: 'El Gran Gatsby', autor: 'F. Scott Fitzgerald' },
    { id: 2, titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez' },
    { id: 3, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes' }
];

//2. Definir los resolvers 
const resolvers = {
  Query: {
    libros: () => libros,
    libro: (parent, args) => libros.find(libro => libro.id === parseInt(args.id))
  },
    Mutation: {
    agregarLibro: (parent,{titulo, autor}) => {
        const nuevoLibro = { id: libros.length + 1, titulo, autor };
        libros.push(nuevoLibro);
        return nuevoLibro;
    }
}
};

//3. Crear una instancia de Apollo Server
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

    //4. Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor GraphQL corriendo en http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer();