// Importo la función check desde el paquete 'express-validator'
const { check } = require('express-validator')

// Importo la función validateResults desde el archivo 'handleValidator' en la carpeta 'utils'
const validateResults = require('../utils/handleValidator')

// Creo una constante que validará las creaciones de comercios
const validateCreateItem = [
    // Verifico que el campo "name" exista, sea una cadena de texto y no esté vacío
    check("name").exists().isString().notEmpty(),
    // Verifico que el campo "CIF" exista, sea un entero y no esté vacío
    check("CIF").exists().isInt().notEmpty(),
    // Verifico que el campo "direccion" exista, sea una cadena de texto y no esté vacío
    check("direccion").exists().isString().notEmpty(),
    // Verifico que el campo "email" exista, sea una cadena de texto y no esté vacío
    check("email").exists().isString().notEmpty(),
    // Verifico que el campo "telefono" exista, sea una cadena de texto y no esté vacío
    check("telefono").exists().isString().notEmpty(),
    // Verifico que el campo "id" exista, sea un entero y no esté vacío
    check("id").exists().isInt().notEmpty(),
    // Llamo a la función validateResults para validar los resultados de la petición
    (req, res, next) => validateResults(req, res, next)
]

// Creo una constante que validará el CIF de los comercios
const validateGetItem = [
    // Verifico que el campo "CIF" exista y no esté vacío
    check("CIF").exists().notEmpty(),
    // Llamo a la función validateResults para validar los resultados de la petición
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Creo una constante que validará el login
const validateLogin = [
    // Verifico que el campo "email" exista y no esté vacío
    check("email").exists().notEmpty(),
    // Llamo a la función validateResults para validar los resultados de la petición
    (req, res, next) => validateResults(req, res, next)
]

// Exporto las constantes validateGetItem, validateCreateItem y validateLogin para que puedan usarse en otros archivos
module.exports = { validateGetItem, validateCreateItem, validateLogin }