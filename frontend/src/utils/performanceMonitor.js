import { shouldMonitorPerformance, safeLog } from './environment.js';

class PerformanceMonitor {
  constructor() {
    this.enabled = shouldMonitorPerformance();
    this.metrics = {
      videoLoadTimes: [],
      thumbnailLoadTimes: [],
      totalVideosLoaded: 0,
      failedLoads: 0
    };
  }

  startTimer(id) {
    if (!this.enabled || typeof performance === 'undefined') return;
    this.timers = this.timers || {};
    this.timers[id] = performance.now();
  }

  endTimer(id, type = 'video') {
    if (!this.enabled || !this.timers || !this.timers[id] || typeof performance === 'undefined') return;
    
    const duration = performance.now() - this.timers[id];
    delete this.timers[id];
    
    if (type === 'video') {
      this.metrics.videoLoadTimes.push(duration);
      this.metrics.totalVideosLoaded++;
    } else if (type === 'thumbnail') {
      this.metrics.thumbnailLoadTimes.push(duration);
    }
    
    // Log slow loads
    if (duration > 3000) {
      safeLog.warn(`Slow ${type} load detected: ${duration.toFixed(2)}ms for ${id}`);
    }
  }

  recordFailure(id, error) {
    if (!this.enabled) return;
    this.metrics.failedLoads++;
    safeLog.error(`Failed to load video ${id}:`, error);
  }

  getAverageLoadTime(type = 'video') {
    const times = type === 'video' ? this.metrics.videoLoadTimes : this.metrics.thumbnailLoadTimes;
    if (times.length === 0) return 0;
    return times.reduce((sum, time) => sum + time, 0) / times.length;
  }

  getMetrics() {
    return {
      ...this.metrics,
      averageVideoLoadTime: this.getAverageLoadTime('video'),
      averageThumbnailLoadTime: this.getAverageLoadTime('thumbnail'),
      successRate: this.metrics.totalVideosLoaded / (this.metrics.totalVideosLoaded + this.metrics.failedLoads) * 100
    };
  }

  logSummary() {
    if (!this.enabled) return;
    const metrics = this.getMetrics();
    safeLog.info('Video Performance Summary');
    safeLog.info(`Videos loaded: ${metrics.totalVideosLoaded}`);
    safeLog.info(`Failed loads: ${metrics.failedLoads}`);
    safeLog.info(`Success rate: ${metrics.successRate.toFixed(1)}%`);
    safeLog.info(`Average video load time: ${metrics.averageVideoLoadTime.toFixed(2)}ms`);
    safeLog.info(`Average thumbnail load time: ${metrics.averageThumbnailLoadTime.toFixed(2)}ms`);
  }
}

export const performanceMonitor = new PerformanceMonitor();