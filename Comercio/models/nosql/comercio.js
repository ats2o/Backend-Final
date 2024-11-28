// Importa el módulo mongoose para interactuar con MongoDB
const mongoose = require('mongoose')

// Importa el plugin mongoose-delete para habilitar el borrado lógico
const mongooseDelete = require('mongoose-delete')

// Define un nuevo esquema de mongoose para la colección "comercio"
const Comercio = new mongoose.Schema(
    {
        // Campo 'name' de tipo String
        name: {
            type: String
        },
        // Campo 'CIF' de tipo String y debe ser único
        CIF: {
            type: String,
            unique: true
        },
        // Campo 'direccion' de tipo String
        direccion: {
            type: String,
        },
        // Campo 'email' de tipo String y debe ser único
        email: {
            type: String,
            unique: true
        },
        // Campo 'telefono' de tipo String
        telefono: {
            type: String
        },
        // Campo 'id' de tipo Number
        id: {
            type: Number
        }
    },
    {
        // Habilita la creación automática de timestamps (createdAt, updatedAt)
        timestamp: true, 
        // Desactiva el campo __v (versionKey) que mongoose añade por defecto
        versionKey: false
    }
)

// Añade el plugin mongoose-delete al esquema para habilitar el borrado lógico
Comercio.plugin(mongooseDelete, {overrideMethods: "all"})

// Exporta el modelo 'comercio' basado en el esquema Comercio
module.exports = mongoose.model("comercio", Comercio) // "comercio" es el nombre de la colección en mongoDB (o de la tabla en SQL)