const express = require('express')
const { validateRegister, validateLogin, validateUpdate, validateGetuser } = require('../validators/user')
const { authMiddleware } = require('../middleware/session')
const { getAllUser, register, login, UpdateUser, DeleteUser} = require('../controller/user')
const user = express.Router()

// GET
/**
 * @openapi
 * /api/user:
 *  get:
 *      tags:
 *      - User
 *      summary: Get a user
 *      description: Get al the users in the BBDD
 *      requestBody:
 *          content:
 *              application/json:
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
user.get('/', getAllUser)

// CREATE
/**
 * @openapi
 * /api/user/register:
 *  post:
 *      tags:
 *      - User
 *      summary: User register
 *      description: Register a new user
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/user"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
user.post('/register', validateRegister, register)

/**
 * @openapi
 * /api/user/login:
 *  post:
 *      tags:
 *      - User
 *      summary: User login
 *      description: Login a user
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/login"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
user.post('/login', validateLogin, login)

// UPDATE
/**
 * @openapi
 * /api/user/id:
 *  put:
 *      tags:
 *      - User
 *      summary: Update a user
 *      description: Update a user for the id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/user"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
user.put('/:id', authMiddleware, validateUpdate, UpdateUser)

// DELETE
/**
 * @openapi
 * /api/user/id:
 *  delete:
 *      tags:
 *      - User
 *      summary: Delete a user
 *      description: Delete a user for the id
 *      requestBody:
 *          content:
 *              application/json:
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */ 
user.delete('/:id', validateGetuser, DeleteUser)

module.exports = user