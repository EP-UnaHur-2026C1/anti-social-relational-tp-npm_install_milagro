const opcionesSwagger = {
    openapi: '3.0.0',
    autoBody: false,
    autoQuery: false
};

const swaggerAutogen = require('swagger-autogen')(opcionesSwagger);

const doc = {
    info: {
        title: 'UnaHur Anti-Social Net API',
        description: 'Documentación del backend para la red social de UNAHUR',
    },
    host: 'localhost:3000',
    schemes: ['http'],

    tags: [
        { name: 'Publicaciones', description: 'Endpoints de Publicaciones' },
        { name: 'Usuarios', description: 'Endpoints de Usuarios' },
        { name: 'Etiquetas', description: 'Endpoints de Etiquetas' },
        { name: 'Comentarios', description: 'Endpoints de Comentarios' }
    ],


    // Schemas que se usan en la docu de la API, en los controllers
    components: {
        schemas: {
            UsuarioNuevo: {
                $nickname: "user_123"
            },
            EtiquetaNueva: {
                $name: "Entretenimiento"
            },
            PublicacionNueva: {
                $user_nickname: "user_123",
                $text: "Este es el texto principal del post",
                description: "Esta es una descripción opcional"
            },
            ComentarioNuevo: {
                $text: "Este es un comentario",
                $is_visible: true,
                $user_nickname: 1
            }
        }
    }
};

const archivoDocumentacion = './src/swagger-output.json';

const endpointsDelArchivo = ['./app.js'];

swaggerAutogen(archivoDocumentacion, endpointsDelArchivo, doc);