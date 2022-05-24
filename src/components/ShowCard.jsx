import React from 'react';
import { useNavigate } from 'react-router-dom';
import Placeholder from './placeholder.jpg';
import { motion } from 'framer-motion';

const ShowCard = ({ data }) => {
  const { image, name, status, id } = data;
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => {
        navigate('/show/' + id);
      }}
      className='w-fit relative inline-block cursor-pointer parent'
      whileTap={{
        scale: 0.9,
      }}
      whileHover={{
        scale: 1.1,
      }}
    >
      <img
        src={image ? image?.medium : Placeholder}
        alt={name}
        className='rounded-sm  hover:brightness-50 transition duration-300'
      />
      <div className='absolute text-white bottom-0 mx-auto p-4 w-full opacity-0 transition  child duration-300 pointer-events-none'>
        <h2 className='font-bold text-lg'>{name}</h2>
        <p className='opacity-80 text-xs'>{status}</p>
      </div>
    </motion.div>
  );
};

export default ShowCard;
