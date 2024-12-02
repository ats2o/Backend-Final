// Este archivo "comercio.js" su funcion es ejecutar las variables de la carpeta (controller/user)
const express = require('express') // Importo la funcion express
const { getComercio, getComercios, postComercio, loginComercio, putComercio, deleteComercio, deleteComerciological } = require('../controller/comercio')
// Importo todas las variables del archivo user de la carpeta controller para usarlas mas tarde
// Importo los validadores para verificaciones como en el (GET, POST, PUT, DELETE)
const { validateGetItem, validateCreateItem, validateLogin } = require('../validators/comercio')
const { authMiddleware } = require('../middleware/session')
const CheckRol = require('../middleware/rol')
// Creo la variable comercio que se va a encargar mas tarde poder hacer las llamadas de peticion
const comercio = express.Router()

// GET 
/**
 * @openapi
 * /api/comercio:
 *  get:
 *      tags:
 *      - Comercio
 *      summary: Get all the comercios
 *      description: Get all the comercios in the BBDD
 *      requestBody:
 *          content:
 *              application/json:
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
comercio.get('/', authMiddleware, CheckRol(["admin"]), getComercios); 

/**
 * @openapi
 * /api/comercio/id:
 *  get:
 *      tags:
 *      - Comercio
 *      summary: Get a comercio
 *      description: Get a comercio for the id in the BBDD
 *      requestBody:
 *          content:
 *              application/json:
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
comercio.get('/:CIF', authMiddleware, CheckRol(["admin"]), validateGetItem, getComercio); // Filtra unicamente por un unico comercio (CIF)

// POST 
/**
 * @openapi
 * /api/comercio:
 *  post:
 *      tags:
 *      - Comercio
 *      summary: Create a comercio
 *      description: Create a comercio if in the token the role of the person is admin
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/comercio"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
comercio.post('/', authMiddleware, CheckRol(["admin"]), validateCreateItem, postComercio);

/**
 * @openapi
 * /api/comercio/login:
 *  post:
 *      tags:
 *      - Comercio
 *      summary: Login a comercio
 *      description: Login a comercio if in the token the role's person is admin
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/login_comercio"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
comercio.post('/login', authMiddleware, validateLogin, loginComercio)

// PUT
/**
 * @openapi
 * /api/comercio/CIF:
 *  put:
 *      tags:
 *      - Comercio
 *      summary: Update a comercio
 *      description: Update a comercio for the CIF
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/comercio"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
comercio.put('/:CIF', authMiddleware, CheckRol(["admin"]), validateGetItem, validateCreateItem,  putComercio);

// DELETE  
/**
 * @openapi
 * /api/comercio/CIF:
 *  delete:
 *      tags:
 *      - Comercio
 *      summary: Delete a comercio
 *      description: Delete a comercio for the CIF 
 *      requestBody:
 *          content:
 *              application/json:
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
comercio.delete('/:CIF', validateGetItem, deleteComercio)

/**
 * @openapi
 * /api/comercio/lofical/CIF:
 *  delete:
 *      tags:
 *      - Comercio
 *      summary: Delete a comercio
 *      description: Delete a comercio logical for the CIF
 *      requestBody:
 *          content:
 *              application/json:
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
comercio.delete('/logical/:CIF', validateGetItem, deleteComerciological)

// Exporto la variable comercio para que pueda usarse en otros archivos
module.exports = comercio