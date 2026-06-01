const express = require('express')
const app = express()
const db = require('./models')
require("dotenv").config()

// Importacion de los routers
const routerPublicaciones = require('./routes/publicaciones.routes')
const routerUsuarios = require('./routes/usuarios.routes')
const routerEtiqueta = require('./routes/etiquetas.routes')

const PORT = process.env.PORT || 3000


app.use(express.json())

app.use('/publicaciones', routerPublicaciones)
app.use('/usuarios', routerUsuarios)
app.use('/etiquetas', routerEtiqueta)

app.listen(PORT, async () =>{
    await db.sequelize.sync()
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})