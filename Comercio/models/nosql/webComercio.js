// Importa el módulo mongoose para interactuar con MongoDB
const mongoose = require('mongoose')
// Importa el plugin mongoose-delete para habilitar el borrado lógico
const mongooseDelete = require('mongoose-delete')

// Define un nuevo esquema de mongoose llamado webComercio
const webComercio = new mongoose.Schema(
    {
        // Campo Ciudad de tipo String
        Ciudad : {
            type: String
        },
        // Campo Actividad de tipo String
        Actividad: {
            type: String
        },
        // Campo Titulo de tipo String
        Titulo: {
            type: String
        },
        // Campo Resumen de tipo String
        Resumen: {
            type: String
        },
        // Campo Array_textos que es un array de Strings
        Array_textos: {
            type: [String]
        }, 
        // Campo Array_imagenes que es un array de Strings
        Array_imagenes: {
            type: [String]
        },
        // Campo resenas_users que contiene un objeto con varios campos
        resenas_users: {
            // Campo Scoring de tipo Number con valores entre 0 y 5
            Scoring: {
                type: Number,
                min: 0,
                max: 5
            },
            // Campo Numero_puntuaciones de tipo Number
            Numero_puntuaciones: {
                type: Number,
            },
            // Campo Resenas de tipo String
            Resenas: {
                type: String
            },
        },
        // Campo ref_cif de tipo String y único
        ref_cif: {
            type: String,
            unique: true
        },
    },
    {
        // Habilita la creación de timestamps (createdAt y updatedAt)
        timestamp: true, 
        // Desactiva la versión del documento (__v)
        versionKey: false
    }
)

// Aplica el plugin mongoose-delete al esquema webComercio para habilitar el borrado lógico
webComercio.plugin(mongooseDelete, {overrideMethods: "all"})
// Exporta el modelo webComercio basado en el esquema definido
module.exports = (mongoose.model("webComercio", webComercio))