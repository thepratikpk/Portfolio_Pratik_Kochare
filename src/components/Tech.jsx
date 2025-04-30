import React from 'react'
import { DiRedis } from 'react-icons/di'
import { FaNodeJs } from 'react-icons/fa'
import { RiReactjsLine, RiTailwindCssFill } from 'react-icons/ri'
import { SiAdobeaftereffects, SiAdobephotoshop, SiAdobepremierepro, SiMongodb } from 'react-icons/si'
import { TbBrandNextjs } from 'react-icons/tb'
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
                >
                    <RiReactjsLine className='text-7xl text-cyan-400' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(3)}
                    className='p-4'>
                    <RiTailwindCssFill className='text-7xl text-cyan-400' />
                </motion.div>


                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(5)}
                    className='p-4'>
                    <FaNodeJs className='text-7xl text-green-500' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(2)}
                    className='p-4'>
                    <SiAdobeaftereffects className='text-7xl text-cyan-500' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(6)}
                    className='p-4'>
                    <SiAdobepremierepro className='text-7xl text-cyan-500' />
                </motion.div>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={iconVarients(4)}
                    className='p-4'>
                    <SiAdobephotoshop className='text-7xl text-cyan-500' />
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Tech
