
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
    
    this.errorHandler.log(`${operation} completed in ${responseTime.toFixed(2)}ms`, 'info', {
      operation,
      responseTime,
      memoryUsage: process.memoryUsage()
    });

    // Log slow operations
    if (responseTime > 1000) {
      this.errorHandler.log(`Slow operation detected: ${operation} took ${responseTime.toFixed(2)}ms`, 'warn', {
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
