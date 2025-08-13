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
    console.warn(...args);
  },
  error: (...args) => {
    console.error(...args);
  },
  debug: (...args) => {
    if (!isProduction()) {
      console.debug(...args);
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