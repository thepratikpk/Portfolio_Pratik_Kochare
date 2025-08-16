import { useState, useEffect, useCallback } from 'react';
import { videoCacheManager } from '../utils/videoCacheManager';
import { VIDEO_CONFIG } from '../config/videoConfig';

export const useVideoOptimization = (videoUrl) => {
  const [isOptimized, setIsOptimized] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Check if video is already cached and ready
  useEffect(() => {
    const checkReadiness = () => {
      const ready = videoCacheManager.isVideoReady(videoUrl);
      setIsReady(ready);
      
      if (ready) {
        setIsOptimized(true);
        setLoadingProgress(100);
      }
    };

    checkReadiness();
    
    // Check periodically for readiness updates
    const interval = setInterval(checkReadiness, 500);
    
    return () => clearInterval(interval);
  }, [videoUrl]);

  // Preload video when requested
  const preloadVideo = useCallback(async () => {
    if (isOptimized) return;
    
    try {
      await videoCacheManager.preloadVideo(videoUrl);
      setIsOptimized(true);
      setIsReady(true);
    } catch (error) {
      console.warn('Video preload failed:', error);
    }
  }, [videoUrl, isOptimized]);

  // Get buffer progress
  const getBufferProgress = useCallback(() => {
    return videoCacheManager.getBufferPercentage(videoUrl);
  }, [videoUrl]);

  // Update loading progress
  useEffect(() => {
    if (!isOptimized) return;
    
    const updateProgress = () => {
      const progress = getBufferProgress();
      setLoadingProgress(progress);
    };

    const interval = setInterval(updateProgress, 200);
    return () => clearInterval(interval);
  }, [isOptimized, getBufferProgress]);

  return {
    isOptimized,
    isReady,
    loadingProgress,
    preloadVideo,
    getBufferProgress
  };
};