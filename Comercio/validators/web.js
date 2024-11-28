// Este archivo "comercio.js" en validators se va a encargar de a la hora de las peticiones validarlas
const { check } = require('express-validator') // Importo la funcion check

const validateResults = require('../utils/handleValidator')
// Importo este archivoo que validara que todos los resultados qeu se quieran mandar estan bien

// Creo una variable constante que validara las creaciones de webs
const validateCreateItem = [
    check("Ciudad").exists().notEmpty().isString(),
    check("Actividad").exists().notEmpty().isString(),
    check("Titulo").exists().notEmpty().isString(),
    check("Resumen").exists().notEmpty().isString(),
    check("Array_textos").exists(),
    check("Array_imagenes").exists(),
    check("resenas_user").exists().notEmpty(),
    check("resenas_user.Scoring").exists().notEmpty(),
    check("resenas_user.Numero_puntuaciones").exists().notEmpty(),
    check("resenas_user.Resenas").exists().notEmpty().isString(),
    (req, res, next) => validateResults(req, res, next)
]

// Creo una variable constante que validara el id de las webs
const validateGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => validateResults(req, res, next)
]

// Exporto las variables validateGetItem y validateCreateItem para que pueda usarse en otros archivos
module.exports = { validateCreateItem, validateGetItem}