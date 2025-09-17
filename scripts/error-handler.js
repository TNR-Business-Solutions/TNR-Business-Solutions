#!/usr/bin/env node
/**
 * Comprehensive Error Handling System for TNR Business Solutions
 * Provides centralized error management, logging, and user-friendly error pages
 */

const fs = require('fs');
const path = require('path');

class ErrorHandler {
  constructor() {
    this.projectRoot = process.cwd();
    this.logDir = path.join(this.projectRoot, 'logs');
    this.errorLogFile = path.join(this.logDir, 'errors.log');
    this.performanceLogFile = path.join(this.logDir, 'performance.log');

    // Ensure logs directory exists
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  log(message, level = 'info', context = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      context,
      pid: process.pid,
    };

    const logLine = JSON.stringify(logEntry) + '\n';

    // Write to appropriate log file
    const logFile =
      level === 'error' ? this.errorLogFile : this.performanceLogFile;
    fs.appendFileSync(logFile, logLine);

    // Console output with colors
    const colors = {
      error: '\x1b[31m', // Red
      warn: '\x1b[33m', // Yellow
      info: '\x1b[36m', // Cyan
      debug: '\x1b[90m', // Gray
      success: '\x1b[32m', // Green
    };

    const reset = '\x1b[0m';
    const icon = {
      error: '❌',
      warn: '⚠️',
      info: 'ℹ️',
      debug: '🔍',
      success: '✅',
    };

    console.log(
      `${colors[level] || ''}${icon[level] || 'ℹ️'} ${message}${reset}`
    );
  }

  handleError(error, context = {}) {
    const errorInfo = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
    };

    this.log(`Error: ${error.message}`, 'error', errorInfo);

    // Determine error type and response
    if (error.code === 'ENOENT') {
      return this.handleFileNotFoundError(error, context);
    } else if (error.code === 'EACCES') {
      return this.handlePermissionError(error, context);
    } else if (error.name === 'ValidationError') {
      return this.handleValidationError(error, context);
    } else if (error.name === 'NetworkError') {
      return this.handleNetworkError(error, context);
    } else {
      return this.handleGenericError(error, context);
    }
  }

  handleFileNotFoundError(error, context) {
    this.log(`File not found: ${error.path}`, 'error', context);
    return {
      status: 404,
      message: 'The requested resource was not found',
      userMessage: "Sorry, the page or file you're looking for doesn't exist.",
      suggestion:
        'Please check the URL or contact support if the problem persists.',
    };
  }

  handlePermissionError(error, context) {
    this.log(`Permission denied: ${error.path}`, 'error', context);
    return {
      status: 403,
      message: 'Access denied',
      userMessage: "You don't have permission to access this resource.",
      suggestion: 'Please contact your administrator for access.',
    };
  }

  handleValidationError(error, context) {
    this.log(`Validation error: ${error.message}`, 'warn', context);
    return {
      status: 400,
      message: 'Invalid input data',
      userMessage: 'Please check your input and try again.',
      suggestion: 'Make sure all required fields are filled correctly.',
    };
  }

  handleNetworkError(error, context) {
    this.log(`Network error: ${error.message}`, 'error', context);
    return {
      status: 503,
      message: 'Service temporarily unavailable',
      userMessage:
        "We're experiencing technical difficulties. Please try again later.",
      suggestion: 'If the problem persists, please contact support.',
    };
  }

  handleGenericError(error, context) {
    this.log(`Unexpected error: ${error.message}`, 'error', context);
    return {
      status: 500,
      message: 'Internal server error',
      userMessage: "Something went wrong on our end. We're working to fix it.",
      suggestion: 'Please try again in a few minutes or contact support.',
    };
  }

  createErrorPage(errorResponse, template = 'error') {
    const errorPage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error ${errorResponse.status} - TNR Business Solutions</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .error-container {
            background: white;
            border-radius: 12px;
            padding: 3rem;
            max-width: 600px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .error-code {
            font-size: 6rem;
            font-weight: bold;
            color: #e74c3c;
            margin: 0;
            line-height: 1;
        }
        .error-title {
            font-size: 2rem;
            color: #2c3e50;
            margin: 1rem 0;
        }
        .error-message {
            font-size: 1.1rem;
            color: #7f8c8d;
            margin: 1rem 0 2rem;
            line-height: 1.6;
        }
        .error-suggestion {
            background: #f8f9fa;
            border-left: 4px solid #3498db;
            padding: 1rem;
            margin: 2rem 0;
            border-radius: 4px;
            text-align: left;
        }
        .btn {
            display: inline-block;
            background: #3498db;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin: 0.5rem;
            transition: background 0.3s;
        }
        .btn:hover {
            background: #2980b9;
        }
        .btn-secondary {
            background: #95a5a6;
        }
        .btn-secondary:hover {
            background: #7f8c8d;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="error-code">${errorResponse.status}</div>
        <h1 class="error-title">${errorResponse.userMessage}</h1>
        <p class="error-message">${errorResponse.message}</p>
        
        <div class="error-suggestion">
            <strong>What you can do:</strong><br>
            ${errorResponse.suggestion}
        </div>
        
        <div>
            <a href="/" class="btn">Go Home</a>
            <a href="/contact" class="btn btn-secondary">Contact Support</a>
        </div>
        
        <p style="margin-top: 2rem; font-size: 0.9rem; color: #bdc3c7;">
            Error ID: ${Date.now()}
        </p>
    </div>
</body>
</html>`;

    return errorPage;
  }

  createErrorHandlingMiddleware() {
    return `
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
  errorHandler.log(\`HTTP Error \${errorResponse.status}: \${err.message}\`, 'error', {
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
`;
  }

  createPerformanceMonitor() {
    return `
// Performance Monitoring for TNR Business Solutions
const ErrorHandler = require('./error-handler');

class PerformanceMonitor {
  constructor() {
    this.errorHandler = new ErrorHandler();
    this.metrics = {
      requests: 0,
      errors: 0,
      responseTime: [],
      memoryUsage: []
    };
  }

  startTimer() {
    return process.hrtime();
  }

  endTimer(startTime, operation) {
    const diff = process.hrtime(startTime);
    const responseTime = diff[0] * 1000 + diff[1] / 1e6; // Convert to milliseconds
    
    this.metrics.responseTime.push(responseTime);
    this.metrics.requests++;
    
    this.errorHandler.log(\`\${operation} completed in \${responseTime.toFixed(2)}ms\`, 'info', {
      operation,
      responseTime,
      memoryUsage: process.memoryUsage()
    });

    // Log slow operations
    if (responseTime > 1000) {
      this.errorHandler.log(\`Slow operation detected: \${operation} took \${responseTime.toFixed(2)}ms\`, 'warn', {
        operation,
        responseTime,
        threshold: 1000
      });
    }
  }

  recordError(error, context) {
    this.metrics.errors++;
    this.errorHandler.handleError(error, context);
  }

  getMetrics() {
    const avgResponseTime = this.metrics.responseTime.length > 0 
      ? this.metrics.responseTime.reduce((a, b) => a + b, 0) / this.metrics.responseTime.length 
      : 0;

    return {
      ...this.metrics,
      averageResponseTime: avgResponseTime,
      errorRate: this.metrics.requests > 0 ? (this.metrics.errors / this.metrics.requests) * 100 : 0,
      uptime: process.uptime()
    };
  }
}

module.exports = PerformanceMonitor;
`;
  }

  generateErrorHandlingFiles() {
    // Create error handling middleware
    const middlewarePath = path.join(
      this.projectRoot,
      'scripts',
      'error-middleware.js'
    );
    fs.writeFileSync(middlewarePath, this.createErrorHandlingMiddleware());

    // Create performance monitor
    const monitorPath = path.join(
      this.projectRoot,
      'scripts',
      'performance-monitor.js'
    );
    fs.writeFileSync(monitorPath, this.createPerformanceMonitor());

    // Create error pages
    const errorPagesDir = path.join(
      this.projectRoot,
      'dist',
      'preview',
      'errors'
    );
    if (!fs.existsSync(errorPagesDir)) {
      fs.mkdirSync(errorPagesDir, { recursive: true });
    }

    // 404 page
    const notFoundError = this.handleFileNotFoundError(
      { code: 'ENOENT', path: '/not-found' },
      { url: '/not-found' }
    );
    fs.writeFileSync(
      path.join(errorPagesDir, '404.html'),
      this.createErrorPage(notFoundError)
    );

    // 500 page
    const serverError = this.handleGenericError(
      new Error('Internal server error'),
      { url: '/server-error' }
    );
    fs.writeFileSync(
      path.join(errorPagesDir, '500.html'),
      this.createErrorPage(serverError)
    );

    this.log('Error handling system created successfully', 'success');
  }

  run() {
    this.log('Setting up comprehensive error handling system', 'info');
    this.generateErrorHandlingFiles();

    this.log('Error handling system setup complete', 'success');
    this.log('Created files:', 'info', {
      middleware: 'scripts/error-middleware.js',
      monitor: 'scripts/performance-monitor.js',
      errorPages: 'dist/preview/errors/',
      logs: 'logs/',
    });
  }
}

// Run if called directly
if (require.main === module) {
  const handler = new ErrorHandler();
  handler.run();
}

module.exports = ErrorHandler;
