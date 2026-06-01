const express = require('express')
const app = express()
const db = require('./models')
require("dotenv").config()

// Importacion de los routers
//const routerProductos = require('./routes/productos.routes')
//const routerCategoria = require('./routes/categorias.routes')
//const routerEtiqueta = require('./routes/etiquetas.routes')

const PORT = process.env.PORT || 3000


app.use(express.json())

//Le agregamos a app los routers con prefijos
//app.use('/productos',  routerProductos)
//app.use('/categorias', routerCategoria)
//app.use('/etiquetas', routerEtiqueta)

app.listen(PORT, async () =>{
    await db.sequelize.sync()
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})