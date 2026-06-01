const obtenerUsuarios = async (req, res) => {
    res.json({ mensaje: "obtener usuarios" })
}

const obtenerUsuario = async (req, res) => {
    res.json({ mensaje: "obtener usuario" })
}

const crearUsuario = async (req, res) => {
    res.json({ mensaje: "crear usuario" })
}

const editarUsuario = async (req, res) => {
    res.json({ mensaje: "editar usuario" })
}

const eliminarUsuario = async (req, res) => {
    res.json({ mensaje: "eliminar usuario" })
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    editarUsuario,
    eliminarUsuario
}