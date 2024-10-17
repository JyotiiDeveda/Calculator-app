const swaggerJSDoc = require('swagger-jsdoc');

const port = process.env.PORT;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Calculator-app',
      version: '1.0.0',
      description: 'API documentation for a basic Calculator-app',
    },
    servers: [
      {
        url: `http://localhost:${port}`
      }
    ]
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;