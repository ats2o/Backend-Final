// Este archivo "index.js" su funcion es dependienod de las peticiones las enrruta a un archivo u otro
const express = require('express') // Importo la funcion express
const fs = require('fs') // Importo la funcion express
const comercio = express.Router() // Creo la variable usando la funcion exprees para poder enrrutar

const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

fs.readdirSync(__dirname).filter((file) => {
    const name = removeExtension(file) // Entra en los archivos que tengas en esta carpeta (comercio)
    if (name !== 'index') {
        comercio.use('/' + name, require('./' + name)) // http://localhost:4000/api/
    }
});

// Se exporta la variable comercio para que pueda usarse en otros archivos
module.exports = comercio