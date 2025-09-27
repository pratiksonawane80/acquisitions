import winston from 'winston';
import { formatInTimeZone } from 'date-fns-tz';

const INDIA_TIME_ZONE = 'Asia/Kolkata';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: () =>
        formatInTimeZone(
          new Date(),
          INDIA_TIME_ZONE,
          'yyyy-MM-dd HH:mm:ss.SSSXXX'
        ),
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'acquisitions-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

export default logger;
