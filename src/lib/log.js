// Default no-op logger
let logger = {
    info: () => {},
    error: () => {},
    warn: () => {}
};

// Allow the consuming application to set their own logger
export const setLogger = (customLogger) => {
    if (customLogger && 
        typeof customLogger.info === 'function' &&
        typeof customLogger.error === 'function' &&
        typeof customLogger.warn === 'function') {
        logger = customLogger;
    }
};

const log = {
    info: (...args) => {
        logger.info(...args);
    },
    error: (...args) => {
        logger.error(...args);
    },
    warn: (...args) => {
        logger.warn(...args);
    }
};

export default log; 