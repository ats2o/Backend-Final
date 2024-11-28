// Importa el módulo mongoose para interactuar con MongoDB
const mongoose = require("mongoose")

// Importa el plugin mongoose-delete para agregar funcionalidad de borrado suave (soft delete)
const mongooseDelete = require("mongoose-delete")

// Define un esquema de Mongoose para la colección "storage"
const StorageScheme = new mongoose.Schema(
    {
        // Campo 'url' de tipo String
        url: {
            type: String
        },
        // Campo 'filename' de tipo String
        filename: {
            type: String
        }
    },
    {
        // Agrega automáticamente campos 'createdAt' y 'updatedAt' a los documentos
        timestamps: true,
        // Desactiva la creación del campo '__v' que Mongoose usa para el control de versiones
        varsionKey: false
    }
)

// Aplica el plugin mongoose-delete al esquema, permitiendo métodos de borrado suave
StorageScheme.plugin(mongooseDelete, {overrideMethods: "all"})
// Exporta el modelo basado en el esquema definido, nombrando la colección como "storage"
module.exports = mongoose.model("storage", StorageScheme) // Nombre de la colección (o de la tabla en SQL)