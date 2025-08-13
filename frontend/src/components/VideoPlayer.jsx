import React, { useRef, useState, useEffect } from 'react';
import { FaSpinner, FaPlay } from 'react-icons/fa';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { VIDEO_CONFIG, generateCloudinaryUrl, detectConnectionQuality } from '../config/videoConfig';
import { performanceMonitor } from '../utils/performanceMonitor';

const VideoPlayer = ({
  videoUrl,
  thumbnailUrl,
  title,
  description,
  className = "",
  playOnHover = false,
  isMuted,
  toggleMuteAll
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [connectionQuality, setConnectionQuality] = useState('medium');
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  // Use intersection observer for lazy loading
  const { targetRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: `${VIDEO_CONFIG.LOADING.preloadDistance}px`
  });

  // Detect connection quality on mount with error handling
  useEffect(() => {
    detectConnectionQuality()
      .then(setConnectionQuality)
      .catch(() => {
        // Fallback to medium quality if detection fails
        setConnectionQuality('medium');
      });
  }, []);

  const generateCloudinaryThumbnail = (videoUrl, customThumbnail) => {
    try {
      if (customThumbnail) return customThumbnail;
      return generateCloudinaryUrl(videoUrl, VIDEO_CONFIG.THUMBNAIL);
    } catch (error) {
      console.warn('Failed to generate thumbnail URL:', error);
      return null;
    }
  };

  // Generate optimized video URL based on connection quality with fallback
  const generateOptimizedVideoUrl = (videoUrl) => {
    try {
      if (!videoUrl) return videoUrl;
      
      const qualityConfig = {
        low: { ...VIDEO_CONFIG.PREVIEW, quality: 'auto:low', bitrate: '200k' },
        medium: VIDEO_CONFIG.PREVIEW,
        high: { ...VIDEO_CONFIG.PREVIEW, quality: 'auto:good', bitrate: '500k' }
      };
      
      const config = qualityConfig[connectionQuality] || qualityConfig.medium;
      return generateCloudinaryUrl(videoUrl, config);
    } catch (error) {
      console.warn('Failed to generate optimized video URL:', error);
      // Return original URL as fallback
      return videoUrl;
    }
  };

  const handleMouseEnter = () => {
    if (playOnHover && !hasError) {
      // Add delay before loading video to prevent unnecessary loads on quick hovers
      const timeout = setTimeout(() => {
        setIsHovered(true);
        if (!videoLoaded) {
          setIsLoading(true);
          setVideoLoaded(true);
        } else if (videoRef.current) {
          // Try to play immediately, even if not fully loaded
          videoRef.current.play().catch((error) => {
            console.warn('Video play failed:', error);
            // Don't set error state for play failures, they're common
          });
        }
      }, VIDEO_CONFIG?.LOADING?.hoverDelay || 200);
      setHoverTimeout(timeout);
    }
  };

  const handleMouseLeave = () => {
    if (playOnHover) {
      // Clear timeout if user leaves before delay
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        setHoverTimeout(null);
      }
      
      setIsHovered(false);
      if (videoRef.current) {
        try {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        } catch (error) {
          console.warn('Video pause/reset failed:', error);
        }
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [playOnHover, videoLoaded]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoLoaded) return;

    // YouTube-style progressive loading handlers
    const handleLoadStart = () => {
      setIsLoading(true);
      performanceMonitor.startTimer(videoUrl);
    };

    const handleLoadedMetadata = () => {
      // Video metadata is loaded, we can start playing soon
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      // Enough data is available to start playing
      setIsLoading(false);
      if (isHovered && playOnHover && !hasError) {
        setShowThumbnail(false);
        video.play().catch((error) => {
          console.warn('Video play failed on canplay:', error);
        });
      }
    };

    const handleCanPlayThrough = () => {
      // Enough data is available to play through without interruption
      setIsLoading(false);
    };

    const handleWaiting = () => {
      // Video is waiting for more data (buffering)
      setIsBuffering(true);
    };

    const handlePlaying = () => {
      // Video started playing
      setIsLoading(false);
      setIsBuffering(false);
      setShowThumbnail(false);
      performanceMonitor.endTimer(videoUrl, 'video');
    };

    const handleProgress = () => {
      // Video is downloading/buffering in background
      try {
        if (video.buffered && video.buffered.length > 0 && !hasError) {
          const bufferedEnd = video.buffered.end(0);
          const duration = video.duration;
          if (duration > 0 && !isNaN(duration)) {
            const bufferedPercent = (bufferedEnd / duration) * 100;
            const minBuffer = VIDEO_CONFIG?.LOADING?.minBufferPercent || 10;
            // If we have enough buffered and user is hovering, start playing
            if (bufferedPercent > minBuffer && isHovered && playOnHover && video.paused) {
              video.play().catch((error) => {
                console.warn('Video play failed on progress:', error);
              });
            }
          }
        }
      } catch (error) {
        console.warn('Progress handling failed:', error);
      }
    };

    const handleError = (error) => {
      console.error('Video error:', error);
      setIsLoading(false);
      setIsBuffering(false);
      
      // Retry logic for production stability
      if (retryCount < (VIDEO_CONFIG?.LOADING?.retryAttempts || 2)) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          setHasError(false);
          if (videoRef.current) {
            videoRef.current.load(); // Reload the video
          }
        }, VIDEO_CONFIG?.LOADING?.retryDelay || 1000);
      } else {
        setHasError(true);
        setShowThumbnail(true);
      }
      
      if (performanceMonitor?.recordFailure) {
        performanceMonitor.recordFailure(videoUrl, error);
      }
    };

    const handlePause = () => {
      if (!isHovered) setShowThumbnail(true);
    };

    const handleEnded = () => {
      setShowThumbnail(true);
      video.currentTime = 0;
    };

    // Add all event listeners
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    
    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [videoLoaded, isHovered, playOnHover]);

  const thumbnailSrc = generateCloudinaryThumbnail(videoUrl, thumbnailUrl);

  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        targetRef.current = el;
      }}
      className={`relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer ${className}`}
    >
      {showThumbnail && !thumbnailError && hasIntersected && (
        <div className="relative w-full h-full">
          {thumbnailSrc ? (
            <>
              <img
                src={thumbnailSrc}
                alt={title}
                className="w-full h-full object-cover rounded-xl"
                onError={() => setThumbnailError(true)}
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                <div className="bg-white/90 rounded-full p-4 transition-all duration-300 hover:scale-110 hover:bg-white">
                  <FaPlay className="text-black text-xl ml-1" />
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center rounded-xl">
              <div className="text-center">
                <FaPlay className="text-white text-3xl mx-auto mb-2 opacity-50" />
                <p className="text-white text-sm opacity-70">Video Preview</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading placeholder when not yet intersected */}
      {!hasIntersected && (
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center rounded-xl animate-pulse">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-700 rounded-full mx-auto mb-2 flex items-center justify-center">
              <FaPlay className="text-gray-500 text-lg ml-1" />
            </div>
            <div className="h-4 bg-gray-700 rounded w-24 mx-auto"></div>
          </div>
        </div>
      )}

      {showThumbnail && thumbnailError && (
        <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center rounded-xl">
          <div className="text-center">
            <FaPlay className="text-white text-3xl mx-auto mb-2 opacity-50" />
            <p className="text-white text-sm opacity-70">Video Preview</p>
          </div>
        </div>
      )}

      {videoLoaded && (
        <video
          ref={videoRef}
          src={generateOptimizedVideoUrl(videoUrl)}
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          className={`w-full h-full object-cover rounded-xl transition-opacity duration-300 ${
            showThumbnail ? 'opacity-0 absolute inset-0' : 'opacity-100'
          }`}
        />
      )}

      <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 flex flex-col justify-end transition-opacity duration-300 ${
        isHovered && !showThumbnail ? 'opacity-0' : 'opacity-100'
      }`}>
        <h3 className="text-white text-lg font-semibold mb-1 drop-shadow-lg">{title}</h3>
        <p className="text-white/90 text-sm drop-shadow-md">{description}</p>
      </div>

      {videoLoaded && !showThumbnail && (
        <div 
          className={`absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white text-xs px-3 py-1 rounded-full cursor-pointer transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={(e) => { e.stopPropagation(); toggleMuteAll(); }}
        >
          {isMuted ? "🔇" : "🔊"}
        </div>
      )}

      {(isLoading || isBuffering) && !showThumbnail && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
          <div className="flex flex-col items-center">
            <FaSpinner className="text-white text-3xl animate-spin mb-2" />
            <p className="text-white text-xs opacity-70">
              {isBuffering ? 'Buffering...' : 'Loading...'}
            </p>
          </div>
        </div>
      )}

      {/* Buffer progress indicator (like YouTube) with error handling */}
      {videoLoaded && !showThumbnail && videoRef.current && !hasError && (
        <div className="absolute bottom-2 left-2 right-2">
          <div className="w-full bg-white/20 rounded-full h-1">
            <div 
              className="bg-white/60 h-1 rounded-full transition-all duration-300"
              style={{
                width: (() => {
                  try {
                    const video = videoRef.current;
                    if (video && video.buffered && video.buffered.length > 0 && video.duration > 0) {
                      return `${(video.buffered.end(0) / video.duration) * 100}%`;
                    }
                    return '0%';
                  } catch (error) {
                    console.warn('Buffer progress calculation failed:', error);
                    return '0%';
                  }
                })()
              }}
            />
          </div>
        </div>
      )}

      {/* Error state display */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl">
          <div className="text-center text-white">
            <p className="text-sm mb-2">Video unavailable</p>
            <button 
              onClick={() => {
                setHasError(false);
                setRetryCount(0);
                setVideoLoaded(false);
                setShowThumbnail(true);
              }}
              className="text-xs bg-white/20 px-3 py-1 rounded hover:bg-white/30 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {playOnHover && showThumbnail && (
        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full opacity-70">
          Hover to play
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
