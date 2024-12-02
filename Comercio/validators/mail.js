// Importa la función 'check' del paquete 'express-validator'
const { check } = require("express-validator")

// Importa la función 'validateResults' del archivo '../utils/handleValidator'
const validateResults = require("../utils/handleValidator")

// Define un array de validadores llamado 'validatorMail'
const validatorMail = [
    // Verifica que el campo 'subject' exista y no esté vacío
    check("subject").exists().notEmpty(),
    // Verifica que el campo 'text' exista y no esté vacío
    check("text").exists().notEmpty(),
    // Verifica que el campo 'to' exista y no esté vacío
    check("to").exists().notEmpty(),
    // Función middleware que llama a 'validateResults' con los parámetros 'req', 'res' y 'next'
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Exporta el objeto 'validatorMail' para que pueda ser utilizado en otros archivos
module.exports = { validatorMail }