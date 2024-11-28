// Importamos el módulo multer, que nos ayudará a manejar la subida de archivos
const multer = require("multer")

// Configuramos el almacenamiento para multer
const storage = multer.diskStorage({
    // Definimos la función para el destino del archivo
    destination: function (req, file, callback) { // Pasan argumentos automáticamente
        // Definimos la ruta donde se almacenarán los archivos
        const pathStorage = __dirname + "/../storage"
        // Mostramos la ruta en la consola para depuración
        console.log(pathStorage)
        // Llamamos al callback con null (sin error) y la ruta de almacenamiento
        callback(null, pathStorage) // error y destination
    },
    // Definimos la función para el nombre del archivo
    filename: function (req, file, callback) { // Sobreescribimos o renombramos
        // Obtenemos la extensión del archivo (jpg, pdf, mp4, etc.)
        const ext = file.originalname.split(".").pop() // el último valor
        // Creamos un nombre único para el archivo usando la fecha actual
        const filename = "file-" + Date.now() + "." + ext
        // Llamamos al callback con null (sin error) y el nombre del archivo
        callback(null, filename)
    }
})

// Creamos el middleware de multer usando la configuración de almacenamiento
const uploadMiddleware = multer({ storage }) // Middleware entre la ruta y el controlador

// Exportamos el middleware para que pueda ser usado en otras partes de la aplicación
module.exports = uploadMiddleware;