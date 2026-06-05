const { User } = require('../models')

const obtenerUsuarios = async (req, res) => {
    /* #swagger.tags = ['Usuarios']
        #swagger.summary = 'Obtener todos los usuarios del sistema'
        #swagger.responses[201] = {
            description: 'Usuarios retornados exitosamente.'
        }
    */


    try {
        const usuarios = await User.findAll()
        res.status(201).json(usuarios)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const obtenerUsuario = async (req, res) => {
    /* #swagger.tags = ['Usuarios']
        #swagger.summary = 'Obtiene los detalles de un usuario por su ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID numérico del usuario a buscar',
            required: true,
            type: 'integer'
        }
        #swagger.responses[201] = {
            description: 'Usuario encontrado exitosamente.'
        }
        #swagger.responses[404] = {
            description: 'Usuario no encontrado.'
        }
    */


    try {
        const usuario = await User.findByPk(req.params.id)

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            })
        }

        res.status(201).json(usuario)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const crearUsuario = async (req, res) => {
    /* #swagger.tags = ['Usuarios']
        #swagger.summary = 'Crea un nuevo usuario en el sistema'
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UsuarioNuevo"
                    }
                }
            }
        }
        #swagger.responses[201] = {
            description: 'Usuario creado exitosamente.'
        }
        #swagger.responses[400] = {
            description: 'El nickname es obligatorio o está vacío.'
        }
    */


    try {
        const usuario = await User.create({
            nickname: req.body.nickname
        })

        res.status(201).json(usuario)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const editarUsuario = async (req, res) => {
    /* #swagger.tags = ['Usuarios']
        #swagger.summary = 'Editar los datos de un usuario por su ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID numérico del usuario a buscar',
            required: true,
            type: 'integer'
        }
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UsuarioNuevo"
                    }
                }
            }
        }
        #swagger.responses[201] = {
            description: 'Usuario modificado con exito.'
        }
        #swagger.responses[400] = {
            description: 'El nickname es obligatorio o está vacío.'
        }
        #swagger.responses[404] = {
            description: 'Usuario no encontrado en la base de datos.'
        }
    */


    try {
        const usuario = await User.findByPk(req.params.id)

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            })
        }

        await usuario.update({
            nickname: req.body.nickname
        })

        res.status(201).json(usuario)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const eliminarUsuario = async (req, res) => {
    /* #swagger.tags = ['Usuarios']
        #swagger.summary = 'Elimina un usuario del sistema por su id'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'ID numérico del usuario a eliminar',
            required: true,
            type: 'integer'
        }
        #swagger.responses[201] = {
            description: 'Usuario eliminado exitosamente.'
        }
        #swagger.responses[404] = {
            description: 'Usuario no encontrado.'
        }
    */


    try {
        const usuario = await User.findByPk(req.params.id)

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            })
        }

        await usuario.destroy()

        res.status(201).json({
            mensaje: 'Usuario eliminado exitosamente'
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    editarUsuario,
    eliminarUsuario
}