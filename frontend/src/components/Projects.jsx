import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
  return (
    <div id="projects" className='pb-20'>
      <h2 className='my-20 text-center text-4xl'>Projects</h2>

      {/* Normal projects from constants */}
      <div>
        {PROJECTS.map((project, index) => (
          <div key={index} className='mb-8 flex flex-wrap lg:justify-center'>
            <div className='w-full lg:w-1/4'>
              <img
                src={project.image}
                width={250}
                height={250}
                alt={project.title}
                className='mb-6 rounded'
              />
            </div>
            <div className='w-full max-w-xl lg:w-3/4'>
              <div className="flex items-center gap-3 mb-2">
                <h3 className='font-semibold text-2xl'>{project.title}</h3>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400 transition-colors"
                  >
                    <FaGithub size={20} />
                  </a>
                )}
              </div>
              <p className='mb-4 text-stone-400'>{project.description}</p>
              {project.technologies.map((tech, i) => (
                <span
                  className='mr-2 rounded bg-stone-900 p-2 text-sm font-medium text-stone-300'
                  key={i}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Hardcoded Last Project: My Visual Magic */}
      <div className='mt-20 flex flex-wrap lg:justify-center items-center gap-8'>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className='w-full lg:w-[30%] rounded-xl overflow-hidden shadow-lg'
        >
          <Link to="/videos">
            <motion.video
              className="w-full h-full object-cover rounded-xl"
              src="https://res.cloudinary.com/do8oo0kpx/video/upload/v1750782430/Speed_2_qhslyn.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          </Link>
        </motion.div>



        <div className='w-full max-w-xl lg:w-[60%]'>
          <h3 className='mb-3 font-semibold text-3xl'>My Visual Magic</h3>
          <p className='mb-4 text-stone-400'>
            A curated gallery of my cinematic video edits and creative work.
          </p>
          <span className='mr-2 rounded bg-stone-900 p-2 text-sm font-medium text-stone-300'>
            Premiere Pro
          </span>
          <span className='mr-2 rounded bg-stone-900 p-2 text-sm font-medium text-stone-300'>
            After Effects
          </span>
        </div>
      </div>
    </div>
  );
};

export default Projects;