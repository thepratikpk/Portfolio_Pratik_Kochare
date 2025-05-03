import React from 'react'
import {FaGithub, FaInstagram, FaLinkedin} from "react-icons/fa"

const Navbar = () => {
  return (
    <nav className='flex item-center justify-between py-6'>
        <div className='flex flex-shrink-0 items-ceter'>
            <a href="/" aria-label='Home'></a>
            
        </div>
        <div className='m-8 flex item-center juatify-center gap-4 text-2xl'>
            <a href="http://www.linkedin.com/in/pratik-kochare-91534b281"
                target='_blank'
                rel='noopener noreferrer'
                aria-label='LinkedIn'>
                <FaLinkedin/>
            </a>
            <a href="https://github.com/thepratikpk"
                target='_blank'
                rel='noopener noreferrer'
                aria-label='GitHub'>
                <FaGithub/>
            </a>
            <a href="https://www.instagram.com/thecine.man_/"
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'>
                <FaInstagram/>
            </a>
            

        </div>
    </nav>
  )
}

export default Navbar
