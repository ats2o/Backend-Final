// Este archivo "web.js" su funcion es ejecutar las variables de la carpeta (controller/web)
const express = require('express') // Importo la funcion express
const { getUser, getItems, getItem, createItem, updateItem, deleteItem, deleteItemLogical} = require('../controller/web')
// Importo todas las variables del archivo web de la carpeta controller para usarlas mas tarde
const { cifmiddleware } = require('../middleware/session')
const { validateGetItem, validateCreateItem } = require('../validators/web')
// Importo los validadores para verificaciones como en el (GET, POST, PUT, DELETE)
const web = express.Router()
// Creo la variable comercio que se va a encargar mas tarde poder hacer las llamadas de peticion

// GET
/**
 * @openapi
 * /api/web/usersIteneresados:
 *  get:
 *      tags:
 *      - Web
 *      summary: Get the users interested
 *      description: Get the email user if the token has the CIF and the user choose to revieve ofers (permetirofertas = true)
 *      requestBody:
 *          content:
 *              application/json:
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
web.get('/usersIteneresados', cifmiddleware, getUser)

/**
 * @openapi
 * /api/web:
 *  get:
 *      tags:
 *      - Web
 *      summary: Get al webs
 *      description: Get all the webs in the BBDD
 *      requestBody:
 *          content:
 *              application/json:
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
web.get('/', getItems)

/**
 * @openapi
 * /api/web:
 *  get:
 *      tags:
 *      - Web
 *      summary: Get a web
 *      description: Get a web for the id in the BBDD
 *      requestBody:
 *          content:
 *              application/json:
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
web.get('/:id', validateGetItem, getItem) // Obtinene la web por su id

// POST
/**
 * @openapi
 * /api/web:
 *  post:
 *      tags:
 *      - Web
 *      summary: Create a web
 *      description: Create a web if in the token has the CIF
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/web"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
web.post('/', cifmiddleware, validateCreateItem, createItem)

// PUT
/**
 * @openapi
 * /api/web/id:
 *  put:
 *      tags:
 *      - Web
 *      summary: Update a web
 *      description: Update a web if in the token has the CIF and the id in the URL
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/web"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
web.put('/:id', cifmiddleware, validateGetItem, validateCreateItem, updateItem)

// DELETE
/**
 * @openapi
 * /api/web/id:
 *  delete:
 *      tags:
 *      - Web
 *      summary: Delete a web
 *      description: Delete a web if in the token has the CIF and for the id in the BBDD
 *      requestBody:
 *          content:
 *              application/json:
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
web.delete('/:id', cifmiddleware, validateGetItem, deleteItem)

/**
 * @openapi
 * /api/web/logical/id:
 *  delete:
 *      tags:
 *      - Web
 *      summary: Delete a web (logical)
 *      description: Delete (logical) a web if in the token has the CIF and for the id in the BBDD
 *      requestBody:
 *          content:
 *              application/json:
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
web.delete('/logical/:id', cifmiddleware, validateGetItem, deleteItemLogical)

// Exporto la variable web para que pueda usarse en otros archivos
module.exports = web