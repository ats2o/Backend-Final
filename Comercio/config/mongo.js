// Importa el módulo mongoose, que es una biblioteca de MongoDB para Node.js
const mongoose = require('mongoose');

// Define una función llamada dbconnection que se encargará de conectar a la base de datos
const dbconnection = () => {
    // Obtiene la URI de la base de datos desde las variables de entorno
    const db_uri = process.env.DB_URI;
    
    // Imprime la URI de la base de datos en la consola (útil para depuración)
    console.log(db_uri);
    
    // Desactiva la opción 'strictQuery' de mongoose
    mongoose.set('strictQuery', false);
    
    try {
        // Intenta conectar a la base de datos usando la URI obtenida
        mongoose.connect(db_uri);
        
        // Si la conexión es exitosa, imprime un mensaje en la consola
        console.log('DB connected');
    } catch (error) {
        // Si ocurre un error durante la conexión, imprime un mensaje de error en la consola
        console.err('DB connection failed');
    }
    // Escucha el evento 'connect' en la conexión de mongoose y, si ocurre, imprime un mensaje en la consola
    mongoose.connection.on("connect", () => console.log("DB connected"));
}

// Exporta la función dbconnection para que pueda ser utilizada en otros archivos
module.exports = dbconnection;