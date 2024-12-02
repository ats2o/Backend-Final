// Este archivo "comercio.js" en validators se va a encargar de a la hora de las peticiones validarlas
const { check } = require('express-validator') // Importo la funcion check
const validateResults = require('../utils/handleValidator') 
// Importo este archivoo que validara que todos los resultados qeu se quieran mandar estan bien
// Creo una variable constante que validara las creaciones de comercios
const validateCreateItem = [
    check("name").exists().isString().notEmpty(),
    check("CIF").exists().isInt().notEmpty(),
    check("direccion").exists().isString().notEmpty(),
    check("email").exists().isString().notEmpty(),
    check("telefono").exists().isString().notEmpty(),
    check("id").exists().isInt().notEmpty(),
    (req, res, next) => validateResults(req, res, next)
]

// Creo una variable constante que validara el CIF de los comercios
const validateGetItem = [
    check("CIF").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validateLogin = [
    check("email").exists().notEmpty(),
    (req, res, next) => validateResults(req, res, next)
]

// Exporto las variables validateGetItem y validateCreateItem para que pueda usarse en otros archivos
module.exports = { validateGetItem, validateCreateItem, validateLogin }