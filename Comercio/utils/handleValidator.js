// Importa la función validationResult del paquete 'express-validator'
const { validationResult } = require('express-validator')

// Define una función middleware llamada validateResults
const validateResults = (req, res, next) => {
    try {
        // Intenta validar los resultados de la solicitud (req)
        // Si hay errores de validación, se lanzará una excepción
        validationResult(req).throw()
        // Si no hay errores, llama a la siguiente función middleware
        return next()
    } catch(err) {
        // Si hay errores de validación, captura la excepción
        // Establece el estado de la respuesta HTTP a 403 (Prohibido)
        res.status(403)
        // Envía una respuesta con los errores de validación en formato JSON
        res.send({errors: err.array() })
    }
}

// Exporta la función validateResults para que pueda ser utilizada en otros archivos
module.exports = validateResults