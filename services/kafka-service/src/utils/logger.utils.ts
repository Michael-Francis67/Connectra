import winston from "winston";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const logger = winston.createLogger({
    levels,
    format: winston.format.json(),
    defaultMeta: {service: "kafka-service"},
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: "logs/error.log", level: "error"}),
    ],
});

export default logger;
