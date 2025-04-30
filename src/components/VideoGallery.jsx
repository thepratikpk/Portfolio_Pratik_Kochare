// components/VideoGallery.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VIDEOS = [
  {
    id: 1,
    title: "Video Project 1",
    videoId: "XEH0K6Gz3ro",
    description: "Description of your first video project"
  },
  // Add more videos as needed
];

const VideoGallery = ({ onClose }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const hoverTimer = useRef(null);

  const handleMouseEnter = (video) => {
    // Set a small delay before playing to avoid flashing on accidental hovers
    hoverTimer.current = setTimeout(() => {
      setHoveredVideo(video);
    }, 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current);
    setHoveredVideo(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto p-4 lg:p-8"
    >
      <div className="container mx-auto relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl z-50 hover:text-gray-300 transition-colors"
        >
          &times;
        </button>

        <h2 className="text-4xl text-white mb-8 text-center">My Visual Magic</h2>
        
        <AnimatePresence>
          {selectedVideo ? (
            <motion.div
              key="video-player"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-8"
            >
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="text-white mt-4">
                <h3 className="text-2xl">{selectedVideo.title}</h3>
                <p>{selectedVideo.description}</p>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="mt-4 text-white underline hover:text-gray-300 transition-colors"
              >
                Back to Gallery
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="video-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {VIDEOS.map(video => (
                <motion.div
                  key={video.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedVideo(video)}
                  onMouseEnter={() => handleMouseEnter(video)}
                  onMouseLeave={handleMouseLeave}
                  className="cursor-pointer relative"
                >
                  {/* Thumbnail container */}
                  <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
                    {/* Static thumbnail */}
                    <img 
                      src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                      alt={video.title}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hoveredVideo?.id === video.id ? 'opacity-0' : 'opacity-100'}`}
                      onError={(e) => {
                        e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                      }}
                    />
                    
                    {/* Hover video preview */}
                    {hoveredVideo?.id === video.id && (
                      <div className="absolute inset-0 w-full h-full">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.videoId}&enablejsapi=1`}
                          title={`Preview: ${video.title}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                    
                    {/* Play button overlay (shown when not hovered) */}
                    {hoveredVideo?.id !== video.id && (
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="text-white mt-2 text-xl">{video.title}</h3>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VideoGallery;