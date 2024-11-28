/* Este archivo "comercio.js" su funcion es crear y mas tarde exprotar lo que va a hacer cada llamada simulando un:
    * GET
    * POST 
    * PUT 
    * DELETE
*/

// Importo la funcion express
const express = require('express')
// Importo un archivo de la carpeta models (no pongo el archivo en concreto porque predefinidamente va a coger el llamado index.js)
const {comercioModel} = require('../models')
// Importo la funcion express-validator
const { matchedData } = require('express-validator')
// Importo la funcion handleHttpERROR
const { handleHttpERROR } = require('../utils/handleError')
// Importo la funcion tokenCif
const { tokenCif } = require('../utils/handleJwt')

// Creo una variable constante donde pide todos los comercios de forma ascendente
const getComercios = async (req, res) => {
    try{ 
        // Obtengo todos los comercios ordenados por CIF de forma ascendente
        const dato = await comercioModel.find().sort({ CIF: 1 })
        // Envío los datos obtenidos como respuesta
        res.send(dato)
    }catch (err){
        // Manejo el error en caso de que ocurra
        handleHttpERROR(res, 'ERROR_GET_ITEMS', 403)
    }
}

// Creo una variable constante donde pide un unico comercio por su CIF
const getComercio = async (req, res) => {
    try {
        // Obtengo el CIF de los datos validados de la solicitud
        const {CIF} = matchedData(req)
        // Busco el comercio por su CIF
        const dato = await comercioModel.find({ CIF: CIF })
        // Envío los datos obtenidos como respuesta
        res.send(dato)
    } catch (err) {
        // Manejo el error en caso de que ocurra
        handleHttpERROR(res, 'ERROR_GET_COMERCIO', 403)
    }
}

// Creo una variable constante donde se pueden crear comercios 
const postComercio = async (req, res) => {
    try {
        // Obtengo los datos validados de la solicitud
        const body = matchedData(req)
        // Creo un nuevo comercio con los datos obtenidos
        const datoUser = await comercioModel.create(body)
        // Genero un token para el comercio creado
        const token = await tokenCif(datoUser)
        // Creo un objeto con el token y los datos del comercio
        const dato = {
            token,
            user: datoUser
        }
        // Envío los datos como respuesta
        res.send(dato)
    } catch (err) {
        // Imprimo el error en la consola
        console.log(err)
        // Manejo el error en caso de que ocurra
        handleHttpERROR(res, 'ERROR_CREATE_COMERCIO', 403)
    }
}

// Creo una variable constante para el login de un comercio
const loginComercio = async (req, res) => {
    try {
        // Obtengo los datos validados de la solicitud
        const body = matchedData(req)
        // Busco el comercio por su email y selecciono los campos name, CIF y email
        const datoUser = await comercioModel.findOne({ email: body.email }).select("name CIF email")
        // Si no se encuentra el comercio, manejo el error
        if (!datoUser) {
            handleHttpERROR(res, 'COMERCIO_NO_EXISTE', 403)
        }
        // Genero un token para el comercio encontrado
        const token = await tokenCif(datoUser)
        // Creo un objeto con el token y los datos del comercio
        const data = {
            token,
            user: datoUser
        }
        // Envío los datos como respuesta
        res.send(data)
    } catch (err) {
        // Manejo el error en caso de que ocurra
        handleHttpERROR(res, 'ERROR_LOGIN_COMERCIO', 403)
    }
}

// Creo una variable constante donde se puede modificar un comercio por su CIF 
const putComercio = async (req, res) => {
    try {
        // Obtengo el CIF de los parámetros de la solicitud
        const CIF = req.params.CIF
        // Obtengo el cuerpo de la solicitud
        const {body} = req
        // Actualizo el comercio con el CIF proporcionado y los nuevos datos
        const dato = await comercioModel.findOneAndUpdate({CIF:CIF}, body, {new:true})
        // Envío los datos actualizados como respuesta
        res.send(dato)
    } catch (err) {
        // Manejo el error en caso de que ocurra
        handleHttpERROR(res, 'ERROR_UPDATE_COMERCIO', 403)
    }
}

// Creo una variable constante donde se puede eliminar un comercio por su CIF
const deleteComercio = async (req, res) => {
    try {
        // Obtengo el CIF de los parámetros de la solicitud
        const cif = req.params.CIF
        // Obtengo el cuerpo de la solicitud
        const {body} = req
        // Elimino el comercio con el CIF proporcionado
        const dato = await comercioModel.findOneAndDelete({CIF: cif}, body)
        // Envío los datos eliminados como respuesta
        res.send(dato)
    } catch (err) {
        // Manejo el error en caso de que ocurra
        handleHttpERROR(res, 'ERROR_DELETE_COMERCIO', 403)
    }
};

// Creo una variable constante donde se elimina de forma lógica
const deleteComerciological = async ( req, res) => {
    try {
        // Obtengo el CIF de los datos validados de la solicitud
        const {CIF} = matchedData(req)
        // Elimino lógicamente el comercio con el CIF proporcionado
        const data = await comercioModel.delete({CIF:CIF})
        // Envío los datos eliminados como respuesta
        res.send(data)
    } catch (err) {
        // Manejo el error en caso de que ocurra
        handleHttpERROR(res, 'ERRRO_DELETE_LOGICAL_COMERCIO', 403)
    }
}

// Exporto todas las variables que se han creado
module.exports = { getComercio, getComercios, postComercio, loginComercio, putComercio, deleteComercio, deleteComerciological }