// Cargar las variables de entorno desde el archivo .env
import 'dotenv/config';
// Importar el módulo express
import express from 'express';
// Crear una instancia de la aplicación express
const app = express();
// Middleware para parsear JSON en las solicitudes
app.use(express.json());
// Importa y usa las rutas definidas en el archivo 'routes.js' para cualquier solicitud que comience con '/api'
import routes from './routes/index.js';
app.use('/api', routes);
import mongoose from 'mongoose';
import morganBody from 'morgan-body';
import { IncomingWebhook } from '@slack/webhook';
import loggerStream from './utils/handleLogger.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './docs/swagger.js';
import cors from 'cors';

// Imprimir el valor de la variable de entorno PORT en la consola
console.log(process.env.PORT);

app.use(cors());

// Función asíncrona para conectar a la base de datos MongoDB
async function connect() {
  try {
    // Intentar conectar a la base de datos usando la URI de la variable de entorno DB_URI
    await mongoose.connect(process.env.DB_URI);
    console.log('Conexión exitosa');
  } catch (error) {
    // Capturar y mostrar cualquier error que ocurra durante la conexión
    console.error('Error al conectar:', error);
  }
}

// Definir el puerto en el que el servidor escuchará, usando la variable de entorno PORT o el puerto 1234 por defecto
const port = process.env.PORT || 1234;

// Iniciar el servidor y escuchar en el puerto definido
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  // Llamar a la función para conectar a la base de datos
  connect();
});
// Crear una instancia de IncomingWebhook con la URL del webhook de Slack
new IncomingWebhook(process.env.SLACK_WEBHOOK);
// Agregar un middleware para enviar los errores a Slack
morganBody(app, {
  noColors: true, //limpiamos el String de datos lo máximo posible antes de mandarlo a Slack
  skip: function (_, res) { //Solo enviamos errores (4XX de cliente y 5XX de servidor)
    return res.statusCode < 400
  },
  stream: loggerStream
})

// Documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));