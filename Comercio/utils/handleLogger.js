// Importamos la clase IncomingWebhook del paquete @slack/webhook
const { IncomingWebhook } = require("@slack/webhook");
// Creamos una instancia de IncomingWebhook utilizando la URL del webhook de Slack
// que se encuentra en las variables de entorno (process.env.SLACK_WEBHOOK)
const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);

// Definimos un objeto loggerStream con un método write
const loggerStream = {
    // El método write toma un mensaje como argumento
    write: message => {
        // Envía el mensaje al webhook de Slack utilizando el método send de la instancia webHook
        webHook.send({
            text: message // El mensaje se envía como un objeto con una propiedad text
        });
    }
};

// Exportamos el objeto loggerStream para que pueda ser utilizado en otros módulos
module.exports = loggerStream;