const { follows } = require('../models');
const { schemaFollows } = require('../schema/follows.schema');

const validarFollow = (req, res, next) => {

    const {error} = schemaComentarios.validate(req.body)
    if (error) {
        return res.status(400).json({error: `El body no cumple con los parametros solicitados: ${error.details[0].message}`})
    }

    next()
}