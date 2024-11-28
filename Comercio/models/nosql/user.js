// Importa el módulo mongoose para interactuar con MongoDB
const mongoose = require("mongoose");

// Define un esquema para la colección de usuarios
const UserSchema = new mongoose.Schema({
    // Campo 'nombre' de tipo String, obligatorio
    nombre: { type: String, required: true },
    // Campo 'email' de tipo String, único y obligatorio
    email: { type: String, unique: true, required: true },
    // Campo 'password' de tipo String, obligatorio
    password: { type: String, required: true },
    // Campo 'edad' de tipo Number, opcional
    edad: { type: Number },
    // Campo 'ciudad' de tipo String, opcional
    ciudad: { type: String },
    // Campo 'intereses' que es un array de Strings, opcional
    intereses: [String],
    // Campo 'permiteRecibirOfertas' de tipo Boolean, con valor por defecto false
    permiteofertas: { type: Boolean, default: false },
    // Campo 'role' de tipo String, con valores permitidos 'user' o 'admin', y valor por defecto 'user'
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, {
    timestamps: true, // Añade campos 'createdAt' y 'updatedAt' al documento
    versionKey: false // Desactiva el campo '__v' que Mongoose usa para el control de versiones
});

// Exporta el modelo 'user' basado en el esquema UserSchema
module.exports = mongoose.model("user", UserSchema); // Nombre de la colección