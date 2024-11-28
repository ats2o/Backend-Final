/* Este archivo "comercio.js" su funcion es crear y mas tarde exprotar lo que va a hacer cada llamada simulando un:
    * POST 
    * PATCH 
    * DELETE
*/

// Importo los dos archivos de models (modelos/estructura)
const { storageModel, webModel } = require('../models')
// Importo la función matchedData de express-validator
const { matchedData } = require('express-validator')
// Importo una variable de un archivo que se utilizará en caso de errores
const { handleHttpERROR } = require('../utils/handleError')

// Creo una variable constante donde crea las imágenes
const createItem = async (req, res) => {
    try {
        // Extraigo el archivo de la solicitud
        const {file} = req
        // Creo un objeto con los datos del archivo
        const filedata = {
            filename: file.filename,
            url: process.env.PUBLIC_URL+"/"+file.filename
        }
        // Guardo los datos del archivo en la base de datos
        const data = await storageModel.create(filedata)
        // Envío la respuesta con los datos guardados
        res.send({data})
    } catch (err) {
        // Manejo de errores en caso de fallo
        handleHttpERROR(res, 'ERROR_CREATE_ITEM', 403)
    }
}

// Creo una variable constante donde puedo modificar la imagen subida
const push = async (req, res) => {
    try {
        // Extraigo el id de los datos validados de la solicitud
        const {id} = matchedData(req)
        // Extraigo los arrays de textos e imágenes del cuerpo de la solicitud
        const {Array_textos, Array_imagenes} = req.body
        // Actualizo el documento en la base de datos añadiendo los nuevos textos e imágenes
        const data = await webModel.findByIdAndUpdate(id, {
            $push: { Array_textos: Array_textos, Array_imagenes: Array_imagenes}}, {new: true}
        )
        // Envío la respuesta con los datos actualizados
        res.send({data})
    } catch (err) {
        // Manejo de errores en caso de fallo
        handleHttpERROR(res, 'ERROR_PUSH_URL', 403)
    }
}

// Creo una variable constante donde elimino de forma permanente la imagen
const deleteItem = async (req, res) => {
    try {
        // Extraigo el id de los datos validados de la solicitud
        const {id} = matchedData(req)
        // Elimino el documento de la base de datos
        const data = await storageModel.deleteOne({_id:id})
        // Envío la respuesta con los datos eliminados
        res.send(data)
    } catch (err) {
        // Manejo de errores en caso de fallo
        handleHttpERROR(res, 'ERROR_DELETE_ITEM', 403)
    }
}

// Creo una variable constante donde elimino de forma lógica
const deleteItemLogical = async (req, res) => {
    try {
        // Extraigo el id de los datos validados de la solicitud
        const {id} = matchedData(req)
        // Elimino el documento de la base de datos de forma lógica
        const data = await storageModel.delete({_id:id})
        // Envío la respuesta con los datos eliminados
        res.send(data)
    } catch (err) {
        // Manejo de errores en caso de fallo
        handleHttpERROR(res, 'ERROR_DELETE_ITEM', 403)
    }
}

// En controller/storage.js, mejorar:
const uploadImage = async (req, res) => {
    try {
        // Extraigo el id de la página web de los parámetros de la solicitud
        const { webId } = req.params;
        // Extraigo el archivo de la solicitud
        const { file } = req;
        // Creo un objeto con los datos del archivo
        const fileData = {
            url: process.env.PUBLIC_URL + "/" + file.filename,
            webpage: webId
        };
        // Guardo los datos del archivo en la base de datos
        const data = await storageModel.create(fileData);
        // Actualizo el documento de la página web añadiendo la nueva imagen
        await webModel.findByIdAndUpdate(webId, {
            $push: { Array_imagenes: data.url }
        });
        // Envío la respuesta con los datos guardados
        res.send(data);
    } catch (err) {
        // Manejo de errores en caso de fallo
        handleHttpERROR(res, 'ERROR_UPLOAD_IMAGE', 403);
    }
};

// Exporto todas las variables creadas
module.exports = { push, createItem, deleteItem, deleteItemLogical, uploadImage }