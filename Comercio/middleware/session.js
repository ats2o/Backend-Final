// Importa la función handleHttpERROR del archivo handleError en la carpeta utils
const { handleHttpERROR } = require('../utils/handleError')
// Importa la función verifyToken del archivo handleJwt en la carpeta utils
const { verifyToken } = require('../utils/handleJwt')
// Importa el modelo userModel del archivo models
const { userModel } = require('../models')
// Importa el modelo comercioModel del archivo models
const { comercioModel } = require('../models')

// Define el middleware de autenticación
const authMiddleware = async (req, res, next) => {
    try {
        // Verifica si el encabezado de autorización está presente
        if (!req.headers.authorization) {
            // Maneja el error si no hay token
            handleHttpERROR(res, "NOT_TOKEN", 401)
            return
        }
        // Obtiene el token del encabezado de autorización
        const token = req.headers.authorization.split(' ').pop()
        // Verifica el token
        const datatoken = await verifyToken(token)
        // Verifica si el token contiene un ID de usuario
        if (!datatoken._id) {
            // Maneja el error si el token no tiene un ID válido
            handleHttpERROR(res, "ERROR_ID_TOKEN", 401)
            return
        }
        // Busca el usuario en la base de datos usando el ID del token
        const user = await userModel.findById(datatoken._id)
        // Asigna el usuario encontrado al objeto de solicitud
        req.user = user
        // Llama a la siguiente función de middleware
        next()
    } catch(err) {
        // Maneja el error si ocurre algún problema durante la verificación del token
        handleHttpERROR(res, 'NOT_SESSION', 401)
    } 
}

// Define el middleware para verificar el CIF
const cifmiddleware = async (req, res, next) => {
    try {
        // Verifica si el encabezado de autorización está presente
        if (!req.headers.authorization) {
            // Maneja el error si no hay token
            handleHttpERROR(res, "NOT_TOKEN", 401)
            return
        }
        // Obtiene el token del encabezado de autorización
        const token = req.headers.authorization.split(' ').pop()
        // Verifica el token
        const datacif = await verifyToken(token)
        // Verifica si el token contiene un CIF
        if (!datacif.CIF) {
            // Maneja el error si el token no tiene un CIF válido
            handleHttpERROR(res, "ERROR_CIF", 401)
            return
        }
        // Busca el comercio en la base de datos usando el CIF del token
        const comercio = await comercioModel.findOne({ CIF: datacif.CIF })
        // Asigna el comercio encontrado al objeto de solicitud
        req.comercio = comercio
        // Llama a la siguiente función de middleware
        next()
    } catch (err) {
        // Maneja el error si ocurre algún problema durante la verificación del token
        handleHttpERROR(res, 'NOT_COMERCIO', 401)
    }
}

// Exporta los middlewares authMiddleware y cifmiddleware
module.exports = { authMiddleware, cifmiddleware }