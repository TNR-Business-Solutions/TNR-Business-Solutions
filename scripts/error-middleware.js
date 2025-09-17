
// Error Handling Middleware for TNR Business Solutions
const ErrorHandler = require('./error-handler');

const errorHandler = new ErrorHandler();

// Global error handler
process.on('uncaughtException', (error) => {
  errorHandler.handleError(error, { type: 'uncaughtException' });
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  errorHandler.handleError(new Error(reason), { 
    type: 'unhandledRejection', 
    promise: promise.toString() 
  });
});

// Express.js error middleware
function errorMiddleware(err, req, res, next) {
  const errorResponse = errorHandler.handleError(err, {
    url: req.url,
    method: req.method,
    userAgent: req.get('User-Agent'),
    ip: req.ip
  });

  // Log the error
  errorHandler.log(`HTTP Error ${errorResponse.status}: ${err.message}`, 'error', {
    url: req.url,
    method: req.method,
    stack: err.stack
  });

  // Send appropriate response
  if (req.accepts('html')) {
    res.status(errorResponse.status).send(errorHandler.createErrorPage(errorResponse));
  } else if (req.accepts('json')) {
    res.status(errorResponse.status).json({
      error: errorResponse.message,
      status: errorResponse.status,
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(errorResponse.status).send(errorResponse.message);
  }
}

module.exports = { errorMiddleware, errorHandler };
