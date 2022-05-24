import React, { useState, useEffect } from 'react';
import instance from './api';
import ReactPaginate from 'react-paginate';
import ShowCard from './components/ShowCard';
import { Next, Previous } from './components/icons';
import Loader from './components/Loader';

const App = () => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const search = async () => {
      const res = await instance.get('/shows', {
        maxContentLength: 2000,
      });

      setResponse(res.data);
    };

    search();
  }, []);

  return (
    <main className=''>
      <div className='block relative'>
        {response.length ? (
          <PaginatedItems itemsPerPage={16} items={response} />
        ) : (
          <Loader />
        )}
      </div>
    </main>
  );
};

export default App;

function Items({ currentItems }) {
  return (
    <div className='grid responsive-grid gap-8 justify-items-center w- '>
      {currentItems && currentItems.map(item => <ShowCard data={item} />)}
    </div>
  );
}

function PaginatedItems({ itemsPerPage, items }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    window.scrollTo(0, 0);
    setItemOffset(newOffset);
  };

  return (
    <div className='mx-auto p-8 '>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel='...'
        nextLabel={<Next />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel={<Previous />}
        renderOnZeroPageCount={null}
        containerClassName='flex items-center text-white items-center sm:w-fit max-w-64 w-1/2 justify-between mx-auto pt-6 block'
        pageLinkClassName='text-orange-400 p-4 hover:bg-charcoal-500 hover:rounded-md transition'
        activeLinkClassName='text-orange-300'
        previousClassName='h-9'
        breakClassName='text-orange-400 p-4 hover:bg-charcoal-500 hover:rounded-md transition'
      />
    </div>
  );
}
