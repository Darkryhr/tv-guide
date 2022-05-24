import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../api';
import Loader from './Loader';
import ShowCard from './ShowCard';

const List = () => {
  const { query } = useParams();
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const search = async () => {
      const res = await instance.get('/search/shows', {
        params: {
          q: query,
        },
      });

      setResponse(res.data);
    };

    search();
  }, [query]);

  return (
    <>
      {response.length ? (
        <div className='grid responsive-grid gap-8 justify-items-center mx-auto p-8'>
          {response.map(res => (
            <ShowCard data={res.show} key={res.show.id} />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default List;
