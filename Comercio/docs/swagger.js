const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Tracks - Express API with Swagger (OpenAPI 3.0)",
            version: "0.1.0",
            description:
                "This is a CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "u-tad",
                url: "https://u-tad.com",
                email: "ricardo.palacios@u-tad.com",
            },
        },
        servers: [
            {
                url: "http://localhost:1234",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer"
                },
            },
            schemas: {
                patch_storage: {
                    type: "object",
                    required: ["Array_textos", "Array_imagenes"],
                    properties: {
                        Array_textos: {
                            type: "array",
                            example: "Tercer intento"
                        },
                        Array_imagenes: {
                            type: "array",
                            example: "http://localhost:4000/file-1729610375428.png"
                        },
                    },
                },

                storage: {
                    type: "object",
                    required: ["url", "filename"],
                    properties: {
                        url: {
                            type: "string",
                            example: "form-data; name=image; filename=test.png"
                        },
                        filename: {
                            type: "string",
                            example: "image/png"
                        },
                    },
                },

                web: {
                    type: "object",
                    required: ["Ciudad", "Actividad", "Titulo", "Resumen", "Array_texto", "Array_imagenes", "resenas_user", "Scoring", "Numero_puntuaciones", "Resenas"],
                    properties: {
                        Ciudad: {
                            type: "string",
                            example: "Madrid"
                        },
                        Actividad: {
                            type: "string",
                            example: "Futbol"
                        },
                        Titulo: {
                            type: "string",
                            example: "Foto"
                        },
                        Resumen: {
                            type: "string",
                            example: "Prueba de la peniltima tarea"
                        },
                        Array_textos: {
                            type: "array"
                        },
                        Array_imagenes: {
                            type: "array"
                        },
                        resenas_user: {
                            type: "object",
                            required: ["Scoring", "Numero_puntuaciones", "Resenas"],
                            properties: {
                                Scoring: {
                                    type: "number",
                                    example: 3
                                },
                                Numero_puntuaciones: {
                                    type: "number",
                                    example: 5
                                },
                                Resenas: {
                                    type: "string",
                                    example: "Muy buena"
                                }
                            }
                        }
                    }
                },

                login_comercio: {
                    type: "object",
                    required: ["email"],
                    properties: {
                        email: {
                            type: "string",
                            example: "adidas@gmail.com"
                        },
                    },
                },

                comercio: {
                    type: "object",
                    required: ["name", "CIF", "direccion", "email", "telefono", "id"],
                    properties: {
                        name: {
                            type: "string",
                            example: "Adidas"
                        },
                        CIF: {
                            type: "string",
                            example: "110"
                        },
                        direccion: {
                            type: "string",
                            example: "adidas@gmail.com"
                        },
                        email: {
                            type: "string",
                            example: "629382394"
                        },
                        id: {
                            type: "number"
                        },
                    },
                },

                user: {
                    type: "object",
                    required: ["nombre", "email", "password", "edad", "ciudad", "intereses", "permetirofertas"],
                    properties: {
                        nombre: {
                            type: "string",
                            example: "Adri"
                        },
                        email: {
                            type: "string",
                            example: "adri@gmail.com"
                        },
                        password: {
                            type: "string"
                        },
                        edad: {
                            type: "number",
                            example: 18
                        },
                        ciudad: {
                            type: "string",
                            example: "Madrid"
                        },
                        intereses: {
                            type: "array", 
                            example: ['Futbol', 'Deporte']
                        }, 
                        permetirofertas: {
                            type: "boolean",
                            example: "true"
                        }
                    },
                },

                login: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            example: "adri@gmail.com"
                        },
                        password: {
                            type: "string"
                        },
                    }
                }
            },
        },
    },
    apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options)