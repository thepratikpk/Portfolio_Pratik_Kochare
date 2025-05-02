import React, { useRef, useState, useEffect } from 'react';

const VideoPlayer = ({ videoUrl, title, description, className = "", playOnHover = false }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleMouseEnter = () => {
    if (playOnHover && videoRef.current) {
      setIsHovered(true);
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (playOnHover && videoRef.current) {
      setIsHovered(false);
      videoRef.current.pause();
    }
  };

  const toggleMute = (e) => {
    // Prevent the click from affecting hover state
    e.stopPropagation();
    
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  // Apply hover handling to the entire container
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
  }, [playOnHover]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl transition-all duration-300 ${className}`}
    >
      <video
        ref={videoRef}
        src={`${videoUrl}#t=0.1`}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        className="w-full h-full object-cover rounded-xl"
      />

      {/* Overlay content (Title & Description) with smooth fade transition */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <h3 className="text-white text-lg font-semibold mb-1">{title}</h3>
        <p className="text-white text-sm">{description}</p>
      </div>

      {/* Sound Badge (clickable) - visible only on hover */}
      <div 
        className={`absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded cursor-pointer transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        onClick={toggleMute}
      >
        {isMuted ? "Muted" : "Sound On"}
      </div>
    </div>
  );
};

export default VideoPlayer;