import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from './icons';

const Footer = () => {
  return (
    <div className='w-full text-sm font-semibold h-20 bg-charcoal-800 flex items-center justify-center relative z-10'>
      Made by{' '}
      <motion.a
        href='https://github.com/Darkryhr'
        target='_blank'
        whileTap={{
          scale: 0.9,
        }}
        whileHover={{
          scale: 1.1,
        }}
      >
        <Logo />
      </motion.a>
    </div>
  );
};

export default Footer;
