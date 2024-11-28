// Este archivo "storage.js" su funcion es ejecutar las variables de la carpeta (controller/storage)
const express = require('express') // Importo la funcion express
const { push, createItem, deleteItem, deleteItemLogical } = require('../controller/storage')
// Importo todas las variables del archivo storage de la carpeta controller para usarlas mas tarde
const uploadMiddleware = require('../utils/handleStorage') 
// Importo el archivpo que verificara cunado haya que hacer un post que esten bien los campos
const { cifmiddleware } = require('../middleware/session')
const { validateGetItem } = require('../validators/web')
// Importo los validadores para verificaciones como en el (PATCH, DELETE)
const storage = express.Router()
// Creo la variable storage que se va a encargar mas tarde poder hacer las llamadas de peticion

// POST
/**
 * @openapi
 * /api/storage:
 *  post:
 *      tags:
 *      - Storage
 *      summary: Create a storage
 *      description: Create a storage
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/storage"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
storage.post('/', uploadMiddleware.single("image"), createItem)

// PATCH
/**
 * @openapi
 * /api/storage/id:
 *  patch:
 *      tags:
 *      - Storage
 *      summary: Patch a storage
 *      description: Patch a storage if in the token has the CIF
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/patch_storage"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
storage.patch('/:id', cifmiddleware, validateGetItem, push)

// DELETE
/**
 * @openapi
 * /api/storage/id:
 *  delete:
 *      tags:
 *      - Storage
 *      summary: Delete a storage
 *      description: DElete a storage for the id in the BBDD
 *      requestBody:
 *          content:
 *              application/json:
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
storage.delete('/:id', validateGetItem, deleteItem) 

/**
 * @openapi
 * /api/storage/logical/id:
 *  delete:
 *      tags:
 *      - Storage
 *      summary: DElete a storage (logical)
 *      description: Delete (logical) a storage for the id in the BBDD
 *      requestBody:
 *          content:
 *              application/json:
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
storage.delete('/logical/:id', validateGetItem, deleteItemLogical)

// Exporto la variable storage para que pueda usarse en otros archivos
module.exports = storage