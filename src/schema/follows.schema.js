const joi = require("joi")

const schemaFollows = Joi.object( {
    following_user_nickname: Joi.string().min(3).max(50).required().messages({
        "string.base": "El campo following_user_nickname es obligatorio y debe ser texto",
        "string.empty": "El campo following_user_nickname es obligatorio",
        "string.min": "El campo following_user_nickname debe tener al menos 3 caracteres"
    }),
    followed_user_nickname: Joi.string().min(3).max(50).required().messages({
        "string.base": "El campo followed_user_nickname es obligatorio y debe ser texto",
        "string.empty": "El campo followed_user_nickname es obligatorio",
        "string.min": "El campo followed_user_nickname debe tener al menos 3 caracteres"
    })
})

module.exports = schemaFollows