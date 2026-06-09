const {User} = require("../models")
const schemaUsuarios = require("../schema/usuarios.schema")

const validarUsuarioSchema = (req, res, next) => {
    const {error} = schemaUsuarios.validate(req.body)
    if (error) {
        return res.status(400).json({error: `El body no cumple con los parametros solicitados: ${error.details[0].message}`})
    }

    next()
}

const validarUsuarioId = async (req, res, next) => {
    const { id } = req.params

    const usuario = await User.findByPk(id, {
        attributes: ["nickname"]
    })

    if (!usuario) {
        return res.status(404).json({
            mensaje: 'Usuario no encontrado'
        })
    }
    

    // Lo devolvemos para que lo use el controller, osea, ya esta validado aca
    req.usuario = usuario

    next()
}

const validarUsuarioExistenteEnBody = async (req, res, next) => {
    const { user_nickname } = req.body;
    
    const usuario = await User.findByPk(user_nickname);
    
    if (!usuario) {
        return res.status(404).json({
            mensaje: 'No se puede crear la publicación: el usuario no existe en la base de datos'
        });
    }
    next();
};

module.exports = {
    validarUsuarioId,
    validarUsuarioSchema,
    validarUsuarioExistenteEnBody
}