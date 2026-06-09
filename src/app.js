const express = require('express')
const app = express()
const db = require('./models')
const swaggerUI = require("swagger-ui-express")
const swaggerFile = require('./swagger-output.json');
require("dotenv").config()

// Importacion de los routers
const routerPublicaciones = require('./routes/publicaciones.routes')
const routerUsuarios = require('./routes/usuarios.routes')
const routerEtiqueta = require('./routes/etiquetas.routes')
const routerComentarios = require('./routes/comentarios.routes')
const routerFollows = require('./routes/follow.routes')

const PORT = process.env.PORT || 3000


app.use(express.json())

app.use('/publicaciones', routerPublicaciones)
app.use('/usuarios', routerUsuarios)
app.use('/etiquetas', routerEtiqueta)
app.use('/comentarios', routerComentarios)
app.use('/seguidos', routerFollows)

//Documentacion
app.use('/docs',  swaggerUI.serve, swaggerUI.setup(swaggerFile))


app.listen(PORT, async () =>{
    await db.sequelize.sync()
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})