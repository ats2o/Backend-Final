// Importa la función handleHttpERROR del módulo handleError
const { handleHttpERROR } = require('../utils/handleError') 

// Define la función middleware CheckRol que toma un parámetro role
const CheckRol = (role) => (req, res, next) => { 
    try {
        // Extrae el objeto user de la solicitud (request)
        const { user } = req
        // Obtiene el rol del usuario 
        const userRol = user.role 
        // Verifica si el rol del usuario está incluido en los roles permitidos
        const checkvalueRol = role.includes(userRol) 
        // Si el rol del usuario no está permitido
        if (!checkvalueRol) { 
            // Envía una respuesta 403 Forbidden con el mensaje de error 'NOT_ALLOWED'
            handleHttpERROR(res, 'NOT_ALLOWED', 403) 
            // Sale de la función middleware
            return 
        }
        next() // Si el rol del usuario está permitido, procede a la siguiente función middleware
    // Si ocurre un error
    } catch (err) { 
        handleHttpERROR(res, 'ERROR_PERMISSIONS', 403) // Envía una respuesta 403 Forbidden con el mensaje de error 'ERROR_PERMISSIONS'
    }
}

module.exports = CheckRol // Exporta la función middleware CheckRol