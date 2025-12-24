// Production environment utilities
export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

// Safe console logging that respects production environment
export const safeLog = {
  info: (...args) => {
    if (!isProduction()) {
      console.log(...args);
    }
  },
  warn: (...args) => {
    // Only log non-AbortError warnings in production
    if (isProduction() && args[0] && args[0].includes && args[0].includes('AbortError')) {
      return; // Suppress AbortError warnings in production
    }
    console.warn(...args);
  },
  error: (...args) => {
    console.error(...args);
  },
  debug: (...args) => {
    if (!isProduction()) {
      console.debug(...args);
    }
  },
  // Special method for video play/pause errors
  videoError: (message, error) => {
    if (error && error.name === 'AbortError') {
      // Only log AbortErrors in development
      if (!isProduction()) {
        console.debug('Video AbortError (expected):', message, error);
      }
    } else {
      console.warn(message, error);
    }
  }
};

// Feature detection utilities
export const supportsIntersectionObserver = () => {
  return typeof IntersectionObserver !== 'undefined';
};

export const supportsVideoElement = () => {
  return typeof HTMLVideoElement !== 'undefined';
};

export const supportsNavigatorConnection = () => {
  return typeof navigator !== 'undefined' && 'connection' in navigator;
};

// Performance monitoring toggle
export const shouldMonitorPerformance = () => {
  return !isProduction() || localStorage.getItem('enablePerformanceMonitoring') === 'true';
};