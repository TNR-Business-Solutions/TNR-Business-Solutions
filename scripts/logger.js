/**
 * Centralized Logging Utility for TNR Business Solutions
 * Replaces console.log with proper structured logging
 */

class Logger {
  constructor(module = 'TNR') {
    this.module = module;
    this.logLevel = process.env.LOG_LEVEL || 'info';
    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
    };
  }

  formatMessage(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const baseMessage = `[${timestamp}] [${
      this.module
    }] [${level.toUpperCase()}] ${message}`;

    if (data) {
      return `${baseMessage} ${JSON.stringify(data, null, 2)}`;
    }
    return baseMessage;
  }

  shouldLog(level) {
    return this.levels[level] <= this.levels[this.logLevel];
  }

  error(message, data = null) {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message, data));
    }
  }

  warn(message, data = null) {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, data));
    }
  }

  info(message, data = null) {
    if (this.shouldLog('info')) {
      console.log(this.formatMessage('info', message, data));
    }
  }

  debug(message, data = null) {
    if (this.shouldLog('debug')) {
      console.log(this.formatMessage('debug', message, data));
    }
  }

  success(message, data = null) {
    if (this.shouldLog('info')) {
      console.log(`✅ ${this.formatMessage('info', message, data)}`);
    }
  }

  progress(message, data = null) {
    if (this.shouldLog('info')) {
      console.log(`🔄 ${this.formatMessage('info', message, data)}`);
    }
  }
}

module.exports = Logger;
