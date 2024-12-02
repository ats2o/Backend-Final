// Carga las variables de entorno desde un archivo .env
require("dotenv").config

// Importa el módulo nodemailer para enviar correos electrónicos
const nodemailer = require('nodemailer')

// Importa el módulo googleapis para usar OAuth2
const { google } = require('googleapis')

// Obtiene el constructor OAuth2 del módulo googleapis
const OAuth2 = google.auth.OAuth2

// Función asíncrona para crear un transportador de correo
const createTransporter = async () => {
    // Crea una instancia de OAuth2 con las credenciales del cliente
    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID, // ID del cliente
        process.env.CLIENT_SECRET, // Secreto del cliente
        process.env.REDIRECT_URI // URI de redirección
    );

    // Establece las credenciales del cliente OAuth2 usando el token de actualización
    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN // Token de actualización
    });

    // Obtiene un token de acceso usando el cliente OAuth2
    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                // Imprime el error en la consola si ocurre
                console.log(err)
                // Rechaza la promesa si falla la creación del token de acceso
                reject("Failed to create access token.");
            }
            // Resuelve la promesa con el token de acceso
            resolve(token);
        });
    });

    // Crea un transportador de correo usando nodemailer y OAuth2
    const transporter = nodemailer.createTransport({
        service: "gmail", // Servicio de correo (Gmail)
        auth: {
            type: "OAuth2", // Tipo de autenticación
            user: process.env.EMAIL, // Dirección de correo electrónico del usuario
            accessToken, // Token de acceso obtenido
            clientId: process.env.CLIENT_ID, // ID del cliente
            clientSecret: process.env.CLIENT_SECRET, // Secreto del cliente
            refreshToken: process.env.REFRESH_TOKEN // Token de actualización
        }
    });

    // Retorna el transportador de correo
    return transporter;
};

// Función asíncrona para enviar un correo electrónico
const sendEmail = async (emailOptions) => {
    try {
        // Crea un transportador de correo
        let emailTransporter = await createTransporter();
        // Envía el correo electrónico usando el transportador y las opciones de correo
        await emailTransporter.sendMail(emailOptions);
    } catch (e) {
        // Imprime el error en la consola si ocurre
        console.log(e)
    }
};

// Exporta la función sendEmail para que pueda ser usada en otros archivos
module.exports = { sendEmail }