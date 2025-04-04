const logger = require('./logger');
const morgan = require('morgan');

morgan.token('body', (request) => JSON.stringify(request.body));

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
};

const customMorgan = morgan(':method :url :status :res[content-length] :response-time ms - Body: :body');
const tinyMorgan = morgan('tiny');

const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: 'Unknown Endpoint'
    })
};

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);
    if (error.name === 'UnauthorizedError' || error.message.includes('401')) {
        return response.status(401).json({
            error: 'Unauthorized request – GitHub token may be invalid or expired'
        })
    }

    else if (error.message && error.message.includes('rate limit')) {
        return response.status(429).json({
            error: 'GitHub API rate limit exceeded – please try again later'
        });
    }

    else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        return response.status(503).json({
            error: 'External API service unavailable – check your network or GitHub status'
        })
    }

    else if (error.response && error.response.data === 404) {
        return response.status(404).json({
            error: 'Requested resource not found on GitHub'
        })
    }

    else if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return response.status(400).json({
            error: 'Invalid JSON payload' 
        })
    }

    next(error);
}

module.exports = {
    customMorgan,
    tinyMorgan,
    requestLogger,
    unknownEndpoint,
    errorHandler,   
}