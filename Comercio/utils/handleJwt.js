// Importa el módulo jsonwebtoken para trabajar con JWT
const jwt = require("jsonwebtoken")
// Importa el modelo de comercio desde la carpeta nosql
const comercio = require("../models/nosql/comercio")
// Obtiene la clave secreta JWT desde las variables de entorno
const JWT_SECRET = process.env.JWT_SECRET

// Función para firmar un token JWT para un usuario
const tokenSign = (user) => {
    // Crea un token JWT con el ID y el rol del usuario, y una expiración de 2 horas
    const sign = jwt.sign(
        {
            _id: user._id,
            role: user.role,
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    )
    // Retorna el token firmado
    return sign
}

// Función para firmar un token JWT para un comercio
const tokenCif = (comercio) => {
    // Crea un token JWT con el CIF del comercio, y una expiración de 2 horas
    const sign = jwt.sign(
        {
            CIF: comercio.CIF
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    )
    // Retorna el token firmado
    return sign
}

// Función para verificar un token JWT
const verifyToken = (tokenJwt) => {
    try {
        // Verifica el token JWT usando la clave secreta
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (err) {
        // En caso de error, lo imprime en la consola
        console.log(err)
    }
}

// Exporta las funciones tokenSign, tokenCif y verifyToken para su uso en otros archivos
module.exports = { tokenSign, tokenCif, verifyToken }