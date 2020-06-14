import express from 'express';
import winston from 'winston';
import gradesRouter from './routes/grades.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './assets/swagger.js';

const myApp = express();
const port = process.env.PORT || 3000;

// Logs
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

// prettier-ignore
global.logger = winston.createLogger({
    level: 'silly',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'grades-control-api.log' })
    ],
    format: combine(
        label({ label: "grades-control-api.log"}),
        timestamp(),
        myFormat
    )
});

myApp.use(express.json());
myApp.use('/grades', gradesRouter);
myApp.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

myApp.listen(port, async () => {
    try {
        logger.info('='.repeat(40));
        logger.info('API Started!');
    } catch (ex) {
        console.error(ex);
    }
});
