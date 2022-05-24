import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../api';
import { Imdb } from './icons';
import { motion } from 'framer-motion';
import Loader from './Loader';

const pageVariants = {
  initial: {
    opacity: 0,
    y: '200vh',
    scale: 0.8,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: '100vh',
    scale: 1.2,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 1,
};

const Show = () => {
  const { id } = useParams();
  const [response, setResponse] = useState({});

  useEffect(() => {
    const search = async () => {
      const res = await instance.get('/shows/' + id);

      setResponse(res.data);
    };

    search();
  }, []);

  return (
    <>
      {response ? (
        <motion.div
          initial='initial'
          animate='in'
          exit='out'
          variants={pageVariants}
          transition={pageTransition}
        >
          <Info show={response} />
        </motion.div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Show;

const Info = ({ show }) => (
  <article className='flex items-center justify-evenly mx-auto bg-gradient-to-t from-charcoal-400 min-h-screen overflow-hidden relative'>
    <div className='sm:max-w-md max-w-none absolute sm:relative md:w-1/2 w-full h-fit sm:px-20 px-0 top-0 -z-10 opacity-30 sm:opacity-100 '>
      <img
        src={show?.image?.original}
        className='object-cover rounded-lg shadow-xl'
        alt=''
      />
    </div>
    <div className='py-10 md:w-1/2 px-10 md:px-0 flex flex-col'>
      <h1 className='text-white font-bold text-7xl pb-4 leading-none'>
        {show.name}
        <span className='text-sm opacity-50 pl-2'>{show.status}</span>
      </h1>
      <div className='pb-4'>
        <Tag>{show.premiered?.replaceAll('-', '/')}</Tag>
        {show.genres?.map(genre => {
          return <Tag>{genre}</Tag>;
        })}
      </div>
      <h3 className='font-bold text-xl pt-2 pb-4 flex items-center'>
        <a
          href={`https://www.imdb.com/title/${show.externals?.imdb}/`}
          target='_blank'
          className='pr-4'
        >
          <Imdb />
        </a>
        {show?.rating?.average ? show.rating?.average : '?'}
        <span className='font-normal text-lg'>/10</span>
      </h3>
      <h4 className='font-bold'>Overview</h4>
      <p
        className='text-sm'
        dangerouslySetInnerHTML={{ __html: show.summary }}
      />
      <div className='flex w-1/2 justify-between pt-4'>
        <div className='flex flex-col items-center'>
          <h4 className='text-sm font-medium'>Network</h4>
          <p className='font-light text-xs truncate'>
            {show.network ? show.network?.name : show?.webChannel?.name}
          </p>
        </div>
        <div className='flex flex-col items-center mx-2'>
          <h4 className='text-sm font-medium'>Runtime</h4>
          <p className='font-light text-xs'>{show.runtime} Min</p>
        </div>
        <div className='flex flex-col items-center'>
          <h4 className='text-sm font-medium'>Language</h4>
          <p className='font-light text-xs'>{show.language}</p>
        </div>
      </div>
    </div>
  </article>
);

const Tag = ({ children }) => (
  <p className='text-white text-xs inline p-2 first:ml-0 mx-1 bg-charcoal-300 rounded-sm'>
    {children}
  </p>
);
