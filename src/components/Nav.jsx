import React, { useEffect, useState } from 'react';
import { Search } from './icons';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Nav = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    navigate('/list/' + value);
    setValue('');
  };

  return (
    <>
      <nav className='flex justify-between items-center px-6 py-4 border-b border-charcoal-300 fixed max-w-full w-full z-50 bg-charcoal-700'>
        <div>
          <Link to='/'>
            <motion.h1
              className='sm:text-4xl text-2xl font-bold text-white'
              whileTap={{
                scale: 0.9,
              }}
              whileHover={{
                scale: 1.1,
              }}
            >
              <span className='text-orange-500'>Tv</span>
              Guide
            </motion.h1>
          </Link>
        </div>
        <div className='bg-none border-b border-orange-400 px-2 py-1 '>
          <form
            onSubmit={handleSubmit}
            className='flex justify-between items-center'
          >
            <input
              type='text'
              onChange={e => setValue(e.target.value)}
              value={value}
              className='focus:outline-none text-sm mb-1 bg-inherit'
            />

            <button type='submit'>
              <Search />
            </button>
          </form>
        </div>
      </nav>
      <div className='w-full h-20'></div>
    </>
  );
};

export default Nav;
