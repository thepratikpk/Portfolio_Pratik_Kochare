import React from 'react'
import { 
  DiRedis, 
  DiPython, 
  DiJavascript1, 
  DiGit, 
  DiGithubBadge 
} from 'react-icons/di'
import { 
  FaNodeJs, 
  FaJava 
} from 'react-icons/fa'
import { 
  RiReactjsLine, 
  RiTailwindCssFill 
} from 'react-icons/ri'
import { 
  SiAdobeaftereffects, 
  SiAdobephotoshop, 
  SiAdobepremierepro, 
  SiAdobelightroom,
  SiExpress, 
  SiMongodb,
  SiPostman,
  SiVercel,
  SiRender,
  SiCloudinary,
  SiGooglecloud,
  SiJsonwebtokens,
  SiLangchain,
  SiCplusplus,
  SiC
} from 'react-icons/si'
import { 
  TbBrandNextjs,
  TbApi 
} from 'react-icons/tb'
import { motion } from 'framer-motion'

const iconVarients = (duration) => ({
    initial: { y: -10 },
    animate: {
        y: [10, -10],
        transition: {
            duration: duration,
            repeat: Infinity,
            ease: "linear",
            repeatType: "reverse",
        }
    }
})
const Tech = () => {
    return (
        <div className='pb-24 '>
            <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 1.5 }}
                className='my-20 text-center text-4xl'>Technologies</motion.h2>
            <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100 }}
                transition={{ duration: 1.5 }}
                className='flex flex-wrap items-center justify-center gap-4'>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(2.5)}
                    className='p-4'
                    title="React.js"
                >
                    <RiReactjsLine className='text-7xl text-cyan-400' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(3)}
                    className='p-4'
                    title="Tailwind CSS"
                >
                    <RiTailwindCssFill className='text-7xl text-cyan-400' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(2.8)}
                    className='p-4'
                    title="C"
                >
                    <SiC className='text-7xl text-blue-600' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(3.2)}
                    className='p-4'
                    title="C++"
                >
                    <SiCplusplus className='text-7xl text-blue-500' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(2.5)}
                    className='p-4'
                    title="JavaScript"
                >
                    <DiJavascript1 className='text-7xl text-yellow-400' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(4.2)}
                    className='p-4'
                    title="Python"
                >
                    <DiPython className='text-7xl text-blue-400' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(5)}
                    className='p-4'
                    title="Node.js"
                >
                    <FaNodeJs className='text-7xl text-green-500' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(4)}
                    className='p-4'
                    title="Express.js"
                >
                    <SiExpress className='text-7xl text-gray-600' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(3.8)}
                    className='p-4'
                    title="REST APIs"
                >
                    <TbApi className='text-7xl text-orange-500' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(2.2)}
                    className='p-4'
                    title="JWT Authentication"
                >
                    <SiJsonwebtokens className='text-7xl text-purple-500' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(3.5)}
                    className='p-4'
                    title="MongoDB"
                >
                    <SiMongodb className='text-7xl text-green-500' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(4.5)}
                    className='p-4'
                    title="Git"
                >
                    <DiGit className='text-7xl text-red-500' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(2.7)}
                    className='p-4'
                    title="GitHub"
                >
                    <DiGithubBadge className='text-7xl text-gray-800 dark:text-white' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(3.3)}
                    className='p-4'
                    title="Postman"
                >
                    <SiPostman className='text-7xl text-orange-500' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(4.8)}
                    className='p-4'
                    title="Vercel"
                >
                    <SiVercel className='text-7xl text-black dark:text-white' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(2.9)}
                    className='p-4'
                    title="Render"
                >
                    <SiRender className='text-7xl text-green-400' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(3.7)}
                    className='p-4'
                    title="Cloudinary"
                >
                    <SiCloudinary className='text-7xl text-blue-500' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(4.3)}
                    className='p-4'
                    title="Google Cloud Storage"
                >
                    <SiGooglecloud className='text-7xl text-blue-400' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(3.6)}
                    className='p-4'
                    title="LangChain"
                >
                    <SiLangchain className='text-7xl text-green-600' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(2)}
                    className='p-4'
                    title="Adobe After Effects"
                >
                    <SiAdobeaftereffects className='text-7xl text-purple-600' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(6)}
                    className='p-4'
                    title="Adobe Premiere Pro"
                >
                    <SiAdobepremierepro className='text-7xl text-purple-700' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(4)}
                    className='p-4'
                    title="Adobe Photoshop"
                >
                    <SiAdobephotoshop className='text-7xl text-blue-600' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(3.4)}
                    className='p-4'
                    title="Adobe Lightroom"
                >
                    <SiAdobelightroom className='text-7xl text-blue-500' />
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Tech
