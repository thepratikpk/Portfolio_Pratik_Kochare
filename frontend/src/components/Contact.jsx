import React from 'react'
import { CONTACT } from '../constants'

const Contact = () => {
  return (
    <div className='border-t borderstone-900 pb-20'>
      <h2 className='my-10 text-center text-4xl'>
        Get In Touch
      </h2>
      <div className='text-center tracking-tighter'>
        <a href="#" className='border-b'>{CONTACT.email}</a>
        <p className='my-4'>
            {CONTACT.phoneNo}
        </p>
      </div>
    </div>
  )
}

export default Contact
