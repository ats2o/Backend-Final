// Creo una variable que se usara que en caso de error te aparezca el mensaje que tu quieras
const handleHttpERROR = (res, message, code=403) => {
    res.status(code).send(message)
}

// Exporto la variable para que pueda usarse en otros archivos
module.exports = {handleHttpERROR}