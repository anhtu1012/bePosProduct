import swaggerAutogen from 'swagger-autogen';
import definitions from '../swagger-definitions.json';
const outputFile = './swagger-output.json'; // File đầu ra chứa spec OpenAPI
const endpointsFiles = ['./src/index.ts', './src/routes/*.ts']; // Đường dẫn đến các file route

const doc = {
  info: {
    title: 'My API',
    description: 'API documentation for Node.js project',
    version: '1.0.0',
  },
  host: 'localhost:8080',
  schemes: ['http'],
  components: {
    schemas: definitions, // Sử dụng definitions từ Prisma
  },
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
