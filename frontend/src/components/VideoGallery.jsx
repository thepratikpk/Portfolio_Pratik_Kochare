import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import axios from 'axios'; 

const VideoGallery = ({ onClose }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/videos'); 
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
        <div className="text-stone-300">Loading videos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="text-red-400">Error loading videos: {error}</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-stone-950 bg-opacity-95 backdrop-blur-md z-50 overflow-y-auto p-4 lg:p-12"
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Back Button */}
        <Link
          to="/"
          onClick={onClose}
          className="absolute top-6 left-6 text-stone-300 hover:text-white transition-all flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>

        <h2 className="text-4xl lg:text-5xl font-semibold text-stone-100 mb-12 pt-20 text-center tracking-tight">
          My Visual Magic
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => {
            const isHovered = hoveredId === video._id; // Changed from video.id to video._id (MongoDB uses _id)
            const isOtherHovered = hoveredId && hoveredId !== video._id;

            return (
              <motion.div
                key={video._id}
                onMouseEnter={() => setHoveredId(video._id)}
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