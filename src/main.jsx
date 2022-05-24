import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from './components/List';
import Show from './components/Show';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { AnimatePresence } from 'framer-motion';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <Nav />
      <AnimatePresence>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='list/:query' element={<List />} />
          <Route path='show/:id' element={<Show />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </React.StrictMode>
  </BrowserRouter>
);
