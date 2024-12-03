/* No para de darme problema en el toBe, no se como solucionarlo, 
con npm test salen errores, pero con el npm start y se prueba todo funciona todo */
const request = require('supertest')
const path = require('path')
const app = require('../app')

describe('User API tests', () => {
    let tokenUser = ""
    let token = ""
    let tokenCif = ""
    let comercioCif = ""
    let userId = ""
    let adminId = ""
    let webId = ''
    let imageId = ""


// USER

    // POST: Register a new user
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/user/register')
            .send({
                "nombre": "Samu",
                "email": "samu@gmail.com",
                "password": "contraseña",
                "edad": 18,
                "ciudad": "Madrid",
                "intereses": ["Futbol", "ordenador", "deporte"],
                "permiteofertas": false
            })
            .set('Accept', 'application/json')
        expect(200)
        expect(response.body.data.user.email).toEqual('samu@gmail.com')
        tokenUser = response.body.data.token 
        userId = response.body.data.user._id 
    })

    // POST: Login the user
    it('should login the user', async () => {
        const response = await request(app)
            .post('/api/user/login')
            .send({
                "email": "alejandro@gmail.com",
                "password": "contraseña123"
            })
            .set('Accept', 'application/json')
        expect(200)
        expect(response.body.data.user.email).toEqual('alejandro@gmail.com')
        token = response.body.data.token
        adminId = response.body.data.user._id
    })

    // GET: All users
    it('should get a list of users', async () => {
        const response = await request(app)
            .get('/api/user')
            .set('Accept', 'application/json')
        expect(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    // PUT: Update a user's information by ID
    it('should update the user information by ID', async () => {
        const response = await request(app)
            .put(`/api/user/${userId}`)
            .set('Authorization', `Bearer ${tokenUser}`) 
            .send({
                "nombre": "Samu",
                "email": "samu@gmail.com",
                "password": "contraseña",
                "edad": 18,
                "ciudad": "Madrid",
                "intereses": ["Futbol", "Padel", "Deporte"],
                "permiteofertas": true
            })
            .set('Accept', 'application/json')
        expect(200)
        expect(response.body.data.email).toEqual('samu@gmail.com')
        
    })

    // PUT: Update a user's city and interests 
    it('should update the user city and interests', async () => {
        const response = await request(app)
            .put(`/api/user/datos/${userId}`)
            .set('Authorization', `Bearer ${tokenUser}`)
            .send({
                "ciudad": "Asturias",
                "intereses": ["Deporte", "Ordenador"],
                "permiteofertas": true
            })
            .set('Accept', 'application/json')
        expect(200)
        expect(response.body.data.ciudad).toEqual('Asturias')
    })


// Comercio

    // GET: Obtener todos los comercios en orden
    it('should get a list of comercios ordered by asc', async () => {
        const response = await request(app)
            .get('/api/comercio?ordenar=asc')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')

        expect(200)
        expect(Array.isArray(response.body)).toBe(true)  
    })

    // GET: Obtener un comercio por CIF
    it('should get a comercio by ID', async () => {
        const response = await request(app)
            .get(`/api/comercio/${comercioCif}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
        expect(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    // POST: Crear un nuevo comercio
    it('should create a new comercio', async () => {
        const response = await request(app)
            .post('/api/comercio')
            .send({
                "name": "Zara",
                "CIF": "20",
                "direccion": "calle Plaza Norte Madrid",
                "email": "zara@gmail.com",
                "telefono": "623984729",
                "id": 7
            })
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
        expect(200)  
        expect(response.body.user.name).toEqual('Zara')
        comercioCif = response.body.user.CIF
        tokenCif = response.body.token
    })

    // POST: Login del comercio
    it('should login the comercio', async () => {
        const response = await request(app)
            .post('/api/comercio/login')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "email": "zara@gmail.com"
            })
            .set('Accept', 'application/json')

        expect(200)
        expect(response.body.data.user.email).toEqual('zara@gmail.com')
        tokenCif = response.body.data.token
    })

    // POST: Enviar un correo electrónico
    // it('should send an email', async () => {
    //     const response = await request(app)
    //         .post('/api/comercio/mail')
    //         .set('Authorization', `Bearer ${token}`)
    //         .send({
    //             "subject": "Hola buenas",
    //             "text": "Prueba 2",
    //             "to": "alejandro.fajardo.ceb@immune.institute"
    //         })
    //         .set('Accept', 'application/json')
            
    //     expect(200)
    // })

    // PUT: Actualizar un comercio por CIF
    it('should update the comercio by ID', async () => {
        const response = await request(app)
            .put(`/api/comercio/${comercioCif}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                "name": "Zara",
                "CIF": "20",
                "direccion": "calle alcobendas, Madrid",
                "email": "zara@gmail.com",
                "telefono": "623984729",
                "id": 7
            })
            .set('Accept', 'application/json')

        expect(200)
        expect(response.body.name).toEqual('Zara')
    })

// Web
    // Crear una nueva web 
    it('should create a new web entry', async () => {
        const response = await request(app)
            .post('/api/web')
            .set('Authorization', `Bearer ${tokenCif}`)
            .set('Accept', 'application/json')
            .send({
                "Ciudad": "Madrid",
                "Actividad": "Deporte",
                "Titulo": "Sitios mas famosos de Madrid",
                "Resumen": "Descripcion de los mejores sitios"
            })
        expect(200) 
        expect(response.body.message).toEqual('Web creada')
        webId = response.body.data._id
    })

    // Obtener usuarios interesados 
    it('should get a list of interested users', async () => {
        const response = await request(app)
            .get('/api/web/usersInteresados')
            .set('Authorization', `Bearer ${tokenCif}`)
            .set('Accept', 'application/json')
        expect(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    // Obtener usuarios interesados por ciudad 
    it('should get a list of interested users by city', async () => {
        const response = await request(app)
            .get('/api/web/userInteresadoCiudad')
            .set('Authorization', `Bearer ${tokenCif}`)
            .set('Accept', 'application/json')
        expect(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    // Obtener información general 
    it('should get general web information', async () => {
        const response = await request(app)
            .get('/api/web')
            .set('Accept', 'application/json')
        expect(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    // Obtener información por ID 
    it('should get web info by ID', async () => {
        const response = await request(app)
            .get(`/api/web/${webId}`)
            .set('Accept', 'application/json')
        expect(200)
        expect(response.body.message).toEqual('Web obtenida por Id')
    })

    // Obtener ciudad por ID 
    it('should get city info by ID', async () => {
        const response = await request(app)
            .get(`/api/web/ciudad/${adminId}`)
            .set('Accept', 'application/json')
        expect(200)
        expect(response.body.message).toEqual('Web obtenida por ciudad')
    })

    // Obtener ciudad o actividad por ID
    it('should get city and activity info by ID', async () => {
        const response = await request(app)
            .get(`/api/web/ciudad&actividad/${adminId}`)
            .set('Accept', 'application/json')
        expect(200)
        expect(response.body.message).toEqual('Web obtenida por ciudad y actividad')
    })


    // Actualizar la web 
    it('should update web entry by ID', async () => {
        const response = await request(app)
            .put(`/api/web/${webId}`)
            .set('Authorization', `Bearer ${tokenCif}`)
            .set('Accept', 'application/json')
            .send({
                "Ciudad": "Madrid",
                "Actividad": "Futbol",
                "Titulo": "Sitios mas famosos de Madrid",
                "Resumen": "Descripcion de los mejores sitios"
            })
        expect(200)
        expect(response.body.message).toEqual('Web actualizada')
    })

    // Actualizar puntuación y reseñas 
    it('should update scoring and reviews for a web entry', async () => {
        const response = await request(app)
            .patch(`/api/web/scoring/${webId}`)
            .set('Authorization', `Bearer ${tokenUser}`)
            .set('Accept', 'application/json')
            .send({
                "resenas_users": {
                    "Scoring": 4,
                    "Resenas": "Muy buenas vistas y buen paisaje"
                }
            })
        expect(200)
        expect(response.body.message).toEqual('Web actualizada el scoring y las resenas')
    })

// Storage

    // Subir una imagen 
    it('should upload an image successfully', async () => {
        const response = await request(app)
        .post('/api/storage')
        .attach('image', path.join(__dirname, 'test.png'))
        expect(200) 
        expect(response.body.message).toEqual('Foto creada')
        imageId = response.body.data._id
    })

    // Actualizar la información del archivo foto y texto
    it('should update the metadata of the uploaded image', async () => {
        const response = await request(app)
            .patch(`/api/storage/${webId}`)
            .set('Authorization', `Bearer ${tokenCif}`)
            .set('Accept', 'application/json')
            .send({
                Array_textos: 'Imagen de codigo',
                Array_imagenes: 'http://localhost:4000/file-1732476849491.png'
            })
        expect(200)
        expect(response.body.message).toEqual('Foto subida')
    })

// Delete

    // DELETE: Delete a user by ID
    it('should delete a user by ID', async () => {
        const response = await request(app)
            .delete(`/api/user/${userId}`)
            .set('Authorization', `Bearer ${tokenUser}`)
            .set('Accept', 'application/json')
        expect(200)
        expect(response.body.message).toEqual('Usuario eliminado')
    })

    // DELETE: Logical delete
    it('should logically delete a user by ID', async () => {
        const response = await request(app)
            .delete(`/api/user/logical/${userId}`)
            .set('Authorization', `Bearer ${tokenUser}`)
            .set('Accept', 'application/json')
        expect(200)
        expect(response.body.message).toEqual('Usuario eliminado logicamente')
    })

// Web

    // Eliminar web por ID
    it('should delete web entry by ID', async () => {
        const response = await request(app)
            .delete(`/api/web/${webId}`)
            .set('Authorization', `Bearer ${tokenCif}`)
            .set('Accept', 'application/json')
        expect(200)
        expect(response.body.message).toEqual('Web eliminada')
    })

    // Eliminar web de forma lógica 
    it('should logically delete web entry by ID', async () => {
        const response = await request(app)
            .delete(`/api/web/logical/${webId}`)
            .set('Authorization', `Bearer ${tokenCif}`)
            .set('Accept', 'application/json')
        expect(200)
        expect(response.body.message).toEqual('Web eliminada logicamente')
    })

// Comercio 

    // DELETE: Eliminar un comercio por CIF
    it('should delete a comercio by CIF', async () => {
        const response = await request(app)
            .delete(`/api/comercio/${comercioCif}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
        expect(200)
        expect(response.body.message).toEqual('Comercio eliminado')
    })

    // DELETE: Eliminar un comercio de forma lógica (soft delete)
    it('should logically delete a comercio by ID', async () => {
        const response = await request(app)
            .delete(`/api/comercio/logical/${comercioCif}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')

        expect(200)
        expect(response.body.message).toEqual('Comercio eliminado logicamente')
    })

// Storage

    // DELETE: Elimina una foto de forma logica
    it('should delete a storage by ID', async () => {
        const response = await request(app)
            .delete(`/api/storage/${imageId}`)
            .set('Authorization', `Bearer ${tokenCif}`)
            .set('Accept', 'application/json')
        expect(200)
        expect(response.body.message).toEqual('Foto eliminada')
    })

    // DELETE: Elimina una foto de forma logica
    it('should delete a storage by ID', async () => {
        const response = await request(app)
            .delete(`/api/storage/logical/${imageId}`)
            .set('Authorization', `Bearer ${tokenCif}`)
            .set('Accept', 'application/json')
        expect(200)
        expect(response.body.message).toEqual('Foto eliminada logicamente')
    })

})