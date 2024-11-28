/* Este archivo "user.js" su funcion es crear y mas tarde exprotar lo que va a hacer cada llamada simulando un:
    * GET
    * POST 
    * PUT 
    * DELETE
*/

// Importo el modelo de web de la carpeta models
const { webModel } = require('../models') 
// Importo el modelo de usuario de la carpeta models
const { userModel } = require('../models') 
// Importo la funcion matchedData de express-validator
const { matchedData } = require('express-validator') 
// Importo una variable de un archivo que se utilizara en caso de errores
const { handleHttpERROR } = require('../utils/handleError') 

// En controller/web.js, implementar:
const getInterestedUsers = async (req, res) => {
    try {
        // Busca un comercio por su CIF
        const comercio = await comercioModel.findOne({CIF: req.comercio.CIF});
        // Busca usuarios interesados en la actividad del comercio y que permiten recibir ofertas
        const users = await userModel.find({
            intereses: { $in: [comercio.actividad] },
            permiteRecibirOfertas: true
        }).select('email');
        // Envia la lista de usuarios encontrados
        res.send(users);
    } catch (err) {
        // Maneja errores en la obtención de usuarios interesados
        handleHttpERROR(res, 'ERROR_GET_INTERESTED_USERS', 403);
    }
};

const getUser = async (req, res) => {
    try {
        // Busca un comercio por su CIF en el modelo web
        const webComercio = await webModel.findOne({ref_cif : req.comercio.CIF})
        // Obtiene la actividad del comercio
        const actividad = webComercio.Actividad
        // Busca usuarios interesados en la actividad del comercio y que permiten recibir ofertas
        const intereses = await userModel.find({intereses: { $in: [actividad] }, permiteofertas: true}).select("email")
        // Envia la lista de usuarios encontrados
        res.send(intereses)
    } catch (err) {
        // Imprime el error en la consola
        console.log(err)
        // Maneja errores en la obtención de usuarios
        handleHttpERROR(res, 'ERROR_GET_USERS', 403)
    }
}

// Creo una variable constante donde va a obtener todos los items
const getItems = async (req, res) => {
    try {
        // Obtiene todos los documentos del modelo web
        const data = await webModel.find()
        // Envia los datos obtenidos
        res.send(data)
    } catch (err) {
        // Maneja errores en la obtención de items
        handleHttpERROR(res, 'ERROR_GET_ITEM', 403)
    }
}

// Creo una variable constante donde va a obtener un unico item ( por su id )
const getItem = async (req, res) => {
    try {
        // Obtiene el id del request
        const {id} = matchedData(req)
        // Busca un documento por su id en el modelo web
        const data = await webModel.findById(id)
        // Envia el dato obtenido
        res.send({data})
    } catch (err) {
        // Maneja errores en la obtención de un item
        handleHttpERROR(res, 'ERROR_GET_ITEM', 403)
    }
}

// Creo una variable constante donde va las webs
const createItem = async (req, res) => {
    try {
        // Obtiene los datos validados del request
        const body = matchedData(req)
        // Asigna el CIF del comercio al cuerpo del request
        body.ref_cif = req.comercio.CIF
        // Crea un nuevo documento en el modelo web con los datos obtenidos
        const data = await webModel.create(body)
        // Envia el dato creado
        res.send(data)
    } catch (err) {
        // Maneja errores en la creación de un item
        handleHttpERROR(res, 'ERROR_CREATE_ITEM', 403)
    }
}

// Creo una variable constante donde va a modificar las webs ya creadas
const updateItem = async (req, res) => {
    try {
        // Obtiene el id y el cuerpo del request
        const {id, ...body} = matchedData(req)
        // Actualiza un documento por su id en el modelo web con los nuevos datos
        const data = await webModel.findByIdAndUpdate(id, body, {new:true})
        // Envia el dato actualizado
        res.send(data)
    } catch (err) {
        // Maneja errores en la actualización de un item
        handleHttpERROR(res, 'ERROR_UPDATE_ITEM', 403)
    }
}

// Creo una variable constante donde va borrar de forma permanente la web ( por su id )
const deleteItem = async (req, res) => {
    try {
        // Obtiene el id del request
        const {id} = matchedData(req)
        // Elimina un documento por su id en el modelo web
        const data = await webModel.deleteOne({_id:id})
        // Envia el dato eliminado
        res.send(data)
    } catch (err) {
        // Maneja errores en la eliminación de un item
        handleHttpERROR(res, 'ERROR_DELETE_ITEM', 403)
    }
}

// Creo una variable constante donde va a borrar de forma logica la web ( por su id )
const deleteItemLogical = async (req, res) => {
    try {
        // Obtiene el id del request
        const {id} = matchedData(req)
        // Elimina lógicamente un documento por su id en el modelo web
        const data = await webModel.delete({_id:id})
        // Envia el dato eliminado
        res.send({data})
    } catch (err) {
        // Maneja errores en la eliminación lógica de un item
        handleHttpERROR(res, 'ERROR_DELETE_LOGICAL_ITEM', 403)
    }
}

// Exporto las variables creadas
module.exports = { getUser, getItems, getItem, createItem, updateItem, deleteItem, deleteItemLogical, getInterestedUsers }