import React from 'react'
import { EXPERIENCES } from '../constants'
import { motion } from 'framer-motion'

const Experience = () => {
  return (
    <div className='pb-4'>
      <motion.h2 
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className='my-20 text-center text-4xl'>
        Experience & Leadership
      </motion.h2>
      <div>
        {EXPERIENCES.map((experience, index) => (
          <motion.div 
            key={index} 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1, delay: index * 0.2 }}
            className='mb-8 flex flex-wrap lg:justify-center'>
            <div className='w-full lg:w-1/4'>
              <p className='mb-2 text-sm text-stone-400'>
                {experience.duration}
              </p>
              <p className='text-xs text-stone-500'>
                {experience.location}
              </p>
            </div>
            <div className='w-full max-w-xl lg:w-3/4'>
              <h3 className='mb-2 font-semibold text-xl'>
                {experience.title}
              </h3>
              <h4 className='mb-3 text-lg text-stone-300'>
                {experience.company}
              </h4>
              <p className='mb-4 text-stone-400 leading-relaxed'>
                {experience.description}
              </p>
              <div className='flex flex-wrap gap-2'>
                {experience.technologies.map((tech, techIndex) => (
                  <span 
                    className='rounded bg-stone-900 px-3 py-1 text-sm font-medium text-stone-300 hover:bg-stone-800 transition-colors' 
                    key={techIndex}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Experience
