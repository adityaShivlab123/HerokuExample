import winston from 'winston';
import { transports, info } from 'winston';

// Logger Configuration
const logger = winston.createLogger({
    transports: [
        new transports.File({
            filename: 'F:/NodeJs APIs/Task_API/src/logger/test.log'
        })
    ]
});
export { logger }

