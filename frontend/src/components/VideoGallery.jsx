import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import axios from 'axios';
import { FiAlertTriangle, FiLoader } from 'react-icons/fi';

const VideoGallery = ({ onClose }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const BACKEND_URI = import.meta.env.DEV
  ? ''
  : import.meta.env.VITE_BACKEND_URI;

const response = await axios.get(`${BACKEND_URI}/api/videos`);

        setVideos(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="text-stone-300 text-5xl"
          >
            <FiLoader />
          </motion.div>
          <p className="text-stone-400 text-sm tracking-wide">Loading videos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-stone-950 flex items-center justify-center"
      >
        <div className="flex flex-col items-center text-red-400">
          <FiAlertTriangle className="text-5xl mb-4 animate-pulse" />
          <p className="text-lg font-medium">Oops! Something went wrong.</p>
          <p className="text-sm text-stone-400 mt-1">Error loading videos: {error}</p>
        </div>
      </motion.div>
      
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-stone-950 bg-opacity-95 backdrop-blur-md z-50 overflow-y-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6"
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Back Button */}
        <Link
          to="/"
          onClick={onClose}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 text-stone-300 hover:text-white transition-all flex items-center gap-2 text-sm sm:text-base"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Back to Home
        </Link>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-100 mb-10 sm:mb-12 pt-16 sm:pt-20 text-center tracking-tight leading-snug">
          My Visual Magic
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {videos.map((video) => {
            const isHovered = hoveredId === video._id;
            const isOtherHovered = hoveredId && hoveredId !== video._id;

            return (
              <motion.div
                key={video._id}
                onMouseEnter={() => setHoveredId(video._id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                  isOtherHovered ? 'blur-sm brightness-75' : ''
                } ${isHovered ? 'scale-105 sm:scale-110 z-10 shadow-2xl' : ''}`}
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
