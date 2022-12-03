import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notes API',
      version: '1.0.0',
      description: 'Notes API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: [`${path.join(__dirname, './routes/*.routes.js')}`],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerApp(app, port) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log('Documentation avalible at http://localhost:8000/api/docs');
}

export default swaggerApp;
