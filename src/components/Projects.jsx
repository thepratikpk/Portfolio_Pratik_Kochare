// components/Projects.jsx
import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import VideoGallery from './VideoGallery';

const Projects = () => {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <div className='pb-4'>
      <h2 className='my-20 text-center text-4xl'>Projects</h2>
      <div>
        {PROJECTS.map((project, index) => (
          <div key={index} className='mb-8 flex flex-wrap lg:justify-center'>
            <div className='w-full lg:w-1/4'>
              <img src={project.image} width={250} height={250} alt={project.title} className='mb-6 rounded'/>
            </div>
            <div className='w-full max-w-xl lg:w-3/4'>
              <h3 className='mb-2 font-semibold text-2xl'>
                {project.title}
              </h3>
              <p className='mb-4 text-stone-400'>{project.description}</p>
              {project.technologies.map((tech, index) => (
                <span className='mr-2 rounded bg-stone-900 p-2 text-sm font-medium text-stone-300' key={index}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-20">
        <motion.button
          onClick={() => setShowGallery(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-stone-600 to-stone-800 rounded-full text-xl font-medium"
        >
          My Visual Magic
        </motion.button>
      </div>

      <AnimatePresence>
        {showGallery && <VideoGallery onClose={() => setShowGallery(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default Projects;