// Importamos el modelo de usuario desde la carpeta de modelos
const { userModel } = require('../models')
// Importamos la función matchedData de express-validator para validar y sanitizar datos
const { matchedData } = require('express-validator')
// Importamos la función handleHttpERROR para manejar errores HTTP
const { handleHttpERROR } = require('../utils/handleError')
// Importamos las funciones encrypt y compare para manejar contraseñas
const { encrypt, compare } = require('../utils/handlePassword')
// Importamos la función tokenSign para manejar tokens JWT
const { tokenSign } = require('../utils/handleJwt')

// Función para obtener todos los usuarios
const getAllUser = async (req, res) => {
    try {
        // Buscamos todos los usuarios en la base de datos
        const data = await userModel.find()
        // Enviamos los datos encontrados como respuesta
        res.send(data)
    } catch (err) {
        // En caso de error, manejamos el error y enviamos una respuesta con código 403
        handleHttpERROR(res, 'ERRO_GET_USERS', 403)
    }
}

// Función para registrar un nuevo usuario
const register = async (req, res) => {
    try {
        // Validamos y sanitizamos los datos de la solicitud
        req = matchedData(req)
        // Encriptamos la contraseña del usuario
        const password = await encrypt(req.password)
        // Creamos un nuevo objeto con los datos del usuario y la contraseña encriptada
        const body = {...req, password}
        // Guardamos el nuevo usuario en la base de datos
        const dataUser = await userModel.create(body)
        // Eliminamos la contraseña del objeto de usuario antes de enviarlo como respuesta
        dataUser.set('password', undefined, { strict: false })
        // Creamos un objeto con el token y los datos del usuario
        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        // Enviamos los datos como respuesta
        res.send(data)
    } catch (err) {
        // En caso de error, manejamos el error y enviamos una respuesta
        handleHttpERROR(res, "ERROR_REGISTER_USER")
    }
}

// Función para iniciar sesión
const login = async (req, res) => {
    try {
        // Validamos y sanitizamos los datos de la solicitud
        req = matchedData(req)
        // Buscamos al usuario por su email y seleccionamos ciertos campos
        const user = await userModel.findOne({ email: req.email }).select("password name role email")
        // Si el usuario no existe, manejamos el error y enviamos una respuesta con código 404
        if (!user) {
            handleHttpERROR(res, "USER_NOT_EXISTS", 404)
            return
        }
        // Comparamos la contraseña proporcionada con la contraseña encriptada almacenada
        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword)
        // Si la contraseña no coincide, manejamos el error y enviamos una respuesta con código 401
        if (!check) {
            handleHttpERROR(res, "INVALID_PASSWORD", 401)
            return
        }
        // Eliminamos la contraseña del objeto de usuario antes de enviarlo como respuesta
        user.set("password", undefined, { strict: false })
        // Creamos un objeto con el token y los datos del usuario
        const data = {
            token: await tokenSign(user),
            user
        }
        // Enviamos los datos como respuesta
        res.send(data)
    } catch (err) {
        // En caso de error, manejamos el error y enviamos una respuesta
        handleHttpERROR(res, "ERROR_LOGIN_USER")
    }
}

// Función para actualizar un usuario
const UpdateUser = async (req, res) => {
    try {
        // Obtenemos el ID del usuario de los parámetros de la solicitud
        const id = req.params.id
        // Validamos y sanitizamos los datos de la solicitud
        const body = matchedData(req)
        // Si se proporciona una nueva contraseña, la encriptamos
        if (body.password) {
            const password = await encrypt(body.password)
            body.password = password
        }
        // Actualizamos el usuario en la base de datos y excluimos la contraseña de la respuesta
        const data = await userModel.findByIdAndUpdate(id, body, {new:true, select: '-password'})
        // Enviamos los datos actualizados como respuesta
        res.send(data)
    } catch (err) {
        // En caso de error, manejamos el error y enviamos una respuesta con código 403
        handleHttpERROR(res, 'ERROR_UPDATE_USER', 403)
    }
}

// Función para eliminar un usuario
const DeleteUser = async (req, res) => {
    try {
        // Validamos y sanitizamos los datos de la solicitud
        const {id} = matchedData(req)
        // Eliminamos el usuario de la base de datos
        const data = await userModel.deleteOne({_id:id})
        // Enviamos los datos de la eliminación como respuesta
        res.send(data)
    } catch (err) {
        // En caso de error, manejamos el error y enviamos una respuesta con código 403
        handleHttpERROR(res, 'ERROR_DELETE_USER', 403)
    }
}

// Función asíncrona para actualizar los datos de un usuario
const UpdateUserDatos = async (req, res) => {
    try {
        // Obtiene el ID del usuario de los parámetros de la solicitud
        const id = req.params.id
        // Extrae y valida los datos del cuerpo de la solicitud
        const body = matchedData(req)
        // Busca y actualiza el usuario por ID, devolviendo los nuevos datos seleccionados
        const data = await userModel.findByIdAndUpdate(id, body, {new:true, select: 'nombre email ciudad intereses permiteofertas'})
        // Envía una respuesta con un mensaje de éxito y los datos actualizados del usuario
        res.send({message: 'Usuario modificado', data})
    } catch (err) {
        // Maneja cualquier error que ocurra durante el proceso y envía una respuesta de error
        handleHttpERROR(res, 'ERROR_UPDATE_USER', 403)
    }
}

// Definimos una función asíncrona llamada DeleteLogicalUser que recibe dos parámetros: req y res
const DeleteLogicalUser = async (req, res) => {
    try {
        // Extraemos el id de los datos validados de la solicitud (req)
        const {id} = matchedData(req)
        // Llamamos al método delete del modelo userModel para eliminar lógicamente el usuario con el id proporcionado
        const data = await userModel.delete({_id:id})
        // Enviamos una respuesta con un mensaje de éxito y los datos resultantes de la operación
        res.send({message: 'Usuario eliminado logicamente', data})
    } catch (err) {
        // En caso de error, manejamos el error enviando una respuesta con un mensaje de error y un código de estado 403
        handleHttpERROR(res, 'ERROR_DELETE_USER', 403)
    }
}

// Exportamos las funciones para que puedan ser utilizadas en otras partes de la aplicación
module.exports = { getAllUser, register, login, UpdateUser, DeleteUser, UpdateUserDatos, DeleteLogicalUser }