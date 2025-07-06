import React, { useRef, useState, useEffect } from 'react';
import { FaSpinner, FaPlay } from 'react-icons/fa';

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

  const generateCloudinaryThumbnail = (videoUrl, customThumbnail) => {
    if (customThumbnail) return customThumbnail;
    if (videoUrl && videoUrl.includes('cloudinary.com')) {
      try {
        const urlParts = videoUrl.split('/');
        const uploadIndex = urlParts.findIndex(part => part === 'upload');
        if (uploadIndex !== -1) {
          const publicId = urlParts[urlParts.length - 1].replace(/\.[^/.]+$/, "");
          const baseUrl = urlParts.slice(0, uploadIndex + 1).join('/');
          return `${baseUrl}/w_400,h_300,c_fill,f_jpg,q_auto,so_2/${publicId}.jpg`;
        }
      } catch (error) {
        console.error('Error generating thumbnail:', error);
      }
    }
    return null;
  };

  const handleMouseEnter = () => {
    if (playOnHover) {
      setIsHovered(true);
      if (!videoLoaded) {
        setIsLoading(true);
        setVideoLoaded(true);
      } else if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    if (playOnHover) {
      setIsHovered(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
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
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => {
      setIsLoading(false);
      setShowThumbnail(false);
    };
    const handleLoadedData = () => {
      setIsLoading(false);
      if (isHovered && playOnHover) {
        video.play().catch(() => {});
      }
    };
    const handlePause = () => {
      if (!isHovered) setShowThumbnail(true);
    };
    const handleEnded = () => {
      setShowThumbnail(true);
      video.currentTime = 0;
    };
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [videoLoaded, isHovered, playOnHover]);

  const thumbnailSrc = generateCloudinaryThumbnail(videoUrl, thumbnailUrl);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer ${className}`}
    >
      {showThumbnail && !thumbnailError && (
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
          src={`${videoUrl}#t=0.1`}
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

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
          <FaSpinner className="text-white text-3xl animate-spin" />
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
