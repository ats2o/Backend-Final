// Importa la función 'check' del paquete 'express-validator'
const { check } = require('express-validator')

// Importa la función 'validateResults' del archivo '../utils/handleValidator'
const validateResults = require('../utils/handleValidator')

// Define un array de validaciones para el registro de usuario
const validateRegister = [
    // Verifica que el campo "nombre" exista, no esté vacío y tenga una longitud entre 3 y 20 caracteres
    check("nombre").exists().notEmpty().isLength({ min: 3, max: 20 }),
    // Verifica que el campo "email" exista, no esté vacío y sea un email válido
    check("email").exists().notEmpty().isEmail(),
    // Verifica que el campo "password" exista, no esté vacío y tenga una longitud entre 5 y 30 caracteres
    check("password").exists().notEmpty().isLength({ min: 5, max: 30 }),
    // Verifica que el campo "edad" exista, no esté vacío y sea numérico
    check("edad").exists().notEmpty().isNumeric(),
    // Verifica que el campo "ciudad" exista, no esté vacío y sea una cadena de texto
    check("ciudad").exists().notEmpty().isString(),
    // Verifica que el campo "intereses" exista
    check("intereses").exists(),
    // Verifica que el campo "permiteofertas" exista, no esté vacío y sea booleano
    check("permiteofertas").exists().notEmpty().isBoolean(),
    // Llama a la función 'validateResults' para manejar los resultados de las validaciones
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Define un array de validaciones para el inicio de sesión de usuario
const validateLogin = [
    // Verifica que el campo "email" exista, no esté vacío y sea un email válido
    check("email").exists().notEmpty().isEmail(),
    // Verifica que el campo "password" exista, no esté vacío y tenga una longitud entre 5 y 30 caracteres
    check("password").exists().notEmpty().isLength({ min: 5, max: 30 }),
    // Llama a la función 'validateResults' para manejar los resultados de las validaciones
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Define un array de validaciones para la actualización de usuario
const validateUpdate = [
    // Verifica que el campo "nombre" exista y no esté vacío
    check("nombre").exists().notEmpty(),
    // Verifica que el campo "email" exista y no esté vacío
    check("email").exists().notEmpty(),
    // Verifica que el campo "password" exista y no esté vacío
    check("password").exists().notEmpty(),
    // Verifica que el campo "edad" exista y no esté vacío
    check("edad").exists().notEmpty(),
    // Verifica que el campo "ciudad" exista y no esté vacío
    check("ciudad").exists().notEmpty(),
    // Verifica que el campo "intereses" exista
    check("intereses").exists(),
    // Verifica que el campo "permiteofertas" exista y no esté vacío
    check("permiteofertas").exists().notEmpty(),
    // Llama a la función 'validateResults' para manejar los resultados de las validaciones
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Define un array de validaciones para obtener un usuario por su ID
const validateGetuser = [
    // Verifica que el campo "id" exista, no esté vacío y sea un ID de MongoDB válido
    check("id").exists().notEmpty().isMongoId(),
    // Llama a la función 'validateResults' para manejar los resultados de las validaciones
    (req, res, next) => validateResults(req, res, next)
]

// Exporta las funciones de validación para ser usadas en otras partes de la aplicación
module.exports = { validateRegister, validateLogin, validateUpdate, validateGetuser }