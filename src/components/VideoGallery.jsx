import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VideoPlayer from './VideoPlayer';
import {VIDEOS} from "../constants/index"



const VideoGallery = ({ onClose }) => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 bg-stone-950 bg-opacity-95 backdrop-blur-md z-50 overflow-y-auto p-4 lg:p-12"
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-stone-300 text-3xl font-light hover:text-white transition-all"
        >
          &times;
        </button>

        <h2 className="text-4xl lg:text-5xl font-semibold text-stone-100 mb-12 text-center tracking-tight">
          My Visual Magic
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {VIDEOS.map((video) => {
            const isHovered = hoveredId === video.id;
            const isOtherHovered = hoveredId && hoveredId !== video.id;

            return (
              <motion.div
                key={video.id}
                onMouseEnter={() => setHoveredId(video.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                  isOtherHovered ? 'blur-sm brightness-75' : ''
                } ${isHovered ? 'scale-110 z-10 shadow-2xl' : ''}`}
              >
                <div className="aspect-video">
                  <VideoPlayer
                    videoUrl={video.videoUrl}
                    title={video.title}
                    description={video.description}
                    playOnHover={true}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default VideoGallery;