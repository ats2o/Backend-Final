// Importa la función sendEmail desde el archivo handleEmail en la carpeta utils
const { sendEmail } = require('../utils/handleEmail')
// Importa la función handleHttpError desde el archivo handleError en la carpeta utils
const { handleHttpError } = require('../utils/handleError')
// Importa la función matchedData desde el paquete express-validator
const { matchedData } = require('express-validator')

// Define una función asíncrona llamada send que toma los parámetros req y res
const send = async (req, res) => {
    try {
        // Extrae y valida los datos de la solicitud (req) usando matchedData
        const info = matchedData(req)
        // Llama a la función sendEmail con los datos validados y espera su resultado
        const data = await sendEmail(info)
        // Envía la respuesta con los datos obtenidos
        res.send(data)
    } catch (err) {
        // Maneja cualquier error llamando a handleHttpError y enviando un mensaje de error
        handleHttpError(res, 'ERROR_SEND_EMAIL')
    }
}

// Exporta la función send para que pueda ser utilizada en otros archivos
module.exports = { send }