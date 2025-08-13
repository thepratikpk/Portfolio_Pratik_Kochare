class VideoPreloader {
  constructor() {
    this.cache = new Map();
    this.preloadQueue = [];
    this.isPreloading = false;
  }

  // Preload video metadata only (fast)
  preloadMetadata(videoUrl) {
    return new Promise((resolve, reject) => {
      if (this.cache.has(videoUrl)) {
        resolve(this.cache.get(videoUrl));
        return;
      }

      const video = document.createElement('video');
      video.preload = 'metadata';
      video.muted = true;
      
      const onLoadedMetadata = () => {
        const videoData = {
          duration: video.duration,
          videoWidth: video.videoWidth,
          videoHeight: video.videoHeight,
          element: video
        };
        
        this.cache.set(videoUrl, videoData);
        cleanup();
        resolve(videoData);
      };

      const onError = () => {
        cleanup();
        reject(new Error(`Failed to preload video: ${videoUrl}`));
      };

      const cleanup = () => {
        video.removeEventListener('loadedmetadata', onLoadedMetadata);
        video.removeEventListener('error', onError);
      };

      video.addEventListener('loadedmetadata', onLoadedMetadata);
      video.addEventListener('error', onError);
      video.src = videoUrl;
    });
  }

  // Preload first few seconds of video for instant playback
  preloadVideoData(videoUrl, seconds = 3) {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.muted = true;
      video.currentTime = 0;

      let hasEnoughData = false;

      const checkProgress = () => {
        if (video.buffered.length > 0) {
          const bufferedEnd = video.buffered.end(0);
          if (bufferedEnd >= seconds || bufferedEnd >= video.duration) {
            hasEnoughData = true;
            cleanup();
            resolve(video);
          }
        }
      };

      const onProgress = () => checkProgress();
      const onCanPlay = () => checkProgress();
      const onError = () => {
        cleanup();
        reject(new Error(`Failed to preload video data: ${videoUrl}`));
      };

      const cleanup = () => {
        video.removeEventListener('progress', onProgress);
        video.removeEventListener('canplay', onCanPlay);
        video.removeEventListener('error', onError);
      };

      video.addEventListener('progress', onProgress);
      video.addEventListener('canplay', onCanPlay);
      video.addEventListener('error', onError);
      video.src = videoUrl;

      // Timeout after 10 seconds
      setTimeout(() => {
        if (!hasEnoughData) {
          cleanup();
          resolve(video); // Return what we have
        }
      }, 10000);
    });
  }

  // Queue videos for background preloading
  queuePreload(videoUrls) {
    this.preloadQueue.push(...videoUrls.filter(url => !this.cache.has(url)));
    this.processQueue();
  }

  async processQueue() {
    if (this.isPreloading || this.preloadQueue.length === 0) return;
    
    this.isPreloading = true;
    
    while (this.preloadQueue.length > 0) {
      const videoUrl = this.preloadQueue.shift();
      try {
        await this.preloadMetadata(videoUrl);
        // Small delay to prevent overwhelming the browser
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.warn('Failed to preload video:', videoUrl, error);
      }
    }
    
    this.isPreloading = false;
  }

  getCachedVideo(videoUrl) {
    return this.cache.get(videoUrl);
  }

  clearCache() {
    this.cache.clear();
  }
}

export const videoPreloader = new VideoPreloader();