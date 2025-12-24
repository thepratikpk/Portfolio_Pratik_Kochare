import React from 'react';
import profilepic from "../assets/profilepic.png";
import profilepic3 from "../assets/profilepic3.png"
import { HERO_CONTENT } from "../constants/index";
import { motion } from 'framer-motion';

const containerVarients ={
  hidden:{opacity:0 ,x:-100},
  visible:{
    opacity:1,x:0,
    transition:{
      duration: 0.5,
      staggerChildren: 0.5,
    }
  }
}
const childVarients ={
  hidden:{opacity:0 ,x:-100},
  visible:{opacity:1,x:0,transition:{duration: 0.5}}
}
const Hero = () => {
  return (
    <div className='pb-4 lg:mb-36'>
      <div className='container mx-auto px-4'>
        <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -75 }}
        transition={{ duration: 1.5 }}
        className='flex flex-col lg:flex-row items-center lg:items-start'>
          {/* Image Container (Top on small screens, Right on large screens) */}
          <div className='w-full lg:w-1/2 flex justify-center lg:justify-end lg:p-8 order-1 lg:order-2 lg:-mt-16'>
            <motion.img 
              src={profilepic3} 
              alt='Pratik' 
              className='max-w-full h-auto lg:max-w-xl lg:-translate-y-8' 
              width={650}
              height={650}
              initial={{x:100,opacity:0}}
              animate={{x:0,opacity:1}}
              transition={{duration:0.7,delay:0}}
            />
          </div>

          {/* Content Container (Bottom on small screens, Left on large screens) */}
          <div className='w-full pl-20 lg:w-1/2 order-2 lg:order-1'>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVarients}
            className='flex flex-col items-center lg:items-start mt-10 lg:mt-0 lg:pr-8'>
              <motion.h2 
                variants={childVarients}
              className='pb-2 text-4xl tracking-tighter lg:text-8xl text-center lg:text-left'>
                Pratik Kochare
              </motion.h2>
              <motion.span className='bg-gradient-to-r from-stone-300 to-stone-500 bg-clip-text text-3xl tracking-tight text-transparent text-center lg:text-left'>
                Full-Stack Developer
              </motion.span>
              <motion.p 
                variants={childVarients}
              className='my-2 max-w-lg py-6 text-xl leading-relaxed tracking-tighter text-center lg:text-left'>
                {HERO_CONTENT}
              </motion.p>
              <motion.a 
                href="/Pratik_Kochare_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className='bg-white rounded-full p-4 text-sm text-stone-800 mb-10'
              >
                Download Resume
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;