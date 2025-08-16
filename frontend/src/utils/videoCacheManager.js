class VideoCacheManager {
  constructor() {
    this.cache = new Map();
    this.preloadQueue = [];
    this.maxCacheSize = 10; // Maximum videos to keep in cache
    this.isPreloading = false;
  }

  // Create a video element and cache it
  createCachedVideo(videoUrl, options = {}) {
    if (this.cache.has(videoUrl)) {
      return this.cache.get(videoUrl);
    }

    const video = document.createElement('video');
    video.preload = options.preload || 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.src = videoUrl;

    // Add to cache
    this.cache.set(videoUrl, video);
    
    // Manage cache size
    if (this.cache.size > this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      const oldVideo = this.cache.get(firstKey);
      if (oldVideo) {
        oldVideo.src = '';
        oldVideo.load();
      }
      this.cache.delete(firstKey);
    }

    return video;
  }

  // Get cached video or create new one
  getVideo(videoUrl, options = {}) {
    return this.cache.get(videoUrl) || this.createCachedVideo(videoUrl, options);
  }

  // Preload video metadata
  preloadVideo(videoUrl) {
    return new Promise((resolve, reject) => {
      const video = this.getVideo(videoUrl, { preload: 'metadata' });
      
      if (video.readyState >= 1) {
        resolve(video);
        return;
      }

      const onLoadedMetadata = () => {
        cleanup();
        resolve(video);
      };

      const onError = () => {
        cleanup();
        reject(new Error(`Failed to preload: ${videoUrl}`));
      };

      const cleanup = () => {
        video.removeEventListener('loadedmetadata', onLoadedMetadata);
        video.removeEventListener('error', onError);
      };

      video.addEventListener('loadedmetadata', onLoadedMetadata);
      video.addEventListener('error', onError);
    });
  }

  // Preload multiple videos in background
  preloadVideos(videoUrls) {
    this.preloadQueue.push(...videoUrls.filter(url => !this.cache.has(url)));
    this.processPreloadQueue();
  }

  async processPreloadQueue() {
    if (this.isPreloading || this.preloadQueue.length === 0) return;
    
    this.isPreloading = true;
    
    // Process 2 videos at a time to avoid overwhelming the browser
    while (this.preloadQueue.length > 0) {
      const batch = this.preloadQueue.splice(0, 2);
      
      try {
        await Promise.allSettled(
          batch.map(url => this.preloadVideo(url))
        );
        
        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.warn('Batch preload failed:', error);
      }
    }
    
    this.isPreloading = false;
  }

  // Check if video is ready to play
  isVideoReady(videoUrl) {
    const video = this.cache.get(videoUrl);
    return video && video.readyState >= 3; // HAVE_FUTURE_DATA
  }

  // Get buffer percentage
  getBufferPercentage(videoUrl) {
    const video = this.cache.get(videoUrl);
    if (!video || !video.buffered.length || !video.duration) return 0;
    
    return (video.buffered.end(0) / video.duration) * 100;
  }

  // Clear cache
  clearCache() {
    this.cache.forEach(video => {
      video.src = '';
      video.load();
    });
    this.cache.clear();
  }

  // Get cache stats
  getCacheStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxCacheSize,
      queueLength: this.preloadQueue.length,
      isPreloading: this.isPreloading
    };
  }
}

export const videoCacheManager = new VideoCacheManager();