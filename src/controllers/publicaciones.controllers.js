const obtenerPublicaciones = async (req, res) => {
    res.json({ mensaje: "obtener publicaciones" })
}

const obtenerPublicacion = async (req, res) => {
    res.json({ mensaje: "obtener una publicación" })
}

const crearPublicacion = async (req, res) => {
    res.json({ mensaje: "crear publicación" })
}

const editarPublicacion = async (req, res) => {
    res.json({ mensaje: "editar publicación" })
}

const eliminarPublicacion = async (req, res) => {
    res.json({ mensaje: "eliminar publicación" })
}

module.exports = {
    obtenerPublicaciones,
    obtenerPublicacion,
    crearPublicacion,
    editarPublicacion,
    eliminarPublicacion
}