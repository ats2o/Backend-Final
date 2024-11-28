// Se define un objeto llamado 'models' que contendrá varios modelos importados.
const models = {
    // Se importa el modelo 'comercioModel' desde el archivo './nosql/comercio'.
    comercioModel: require('./nosql/comercio'),
    // Se importa el modelo 'storageModel' desde el archivo './nosql/storage'.
    storageModel: require('./nosql/storage'),
    // Se importa el modelo 'webModel' desde el archivo './nosql/webComercio'.
    webModel: require('./nosql/webComercio'),
    // Se importa el modelo 'userModel' desde el archivo './nosql/user'.
    userModel: require('./nosql/user')
}

// Se exporta el objeto 'models' para que pueda ser utilizado en otros archivos.
module.exports = models