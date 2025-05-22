import React, { useEffect, useState } from 'react';
import MovieList from './movies-list';
import { Link } from 'react-router-dom';

function Action() {
  


  return (
   <> <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <Link to="/" className="text-lg font-bold">Cimovfi Search App</Link>
        <nav className="space-x-4">
          <Link to="/popular" className="hover:text-gray-400">Popular</Link>
          <Link to="/trending" className="hover:text-gray-400">Trending</Link>
          
        </nav>
      </header>
    <div className="p-4">
      <h1 className="text-white text-2xl mb-4">Action Movies</h1>
      <MovieList fetchUrl="/api/popular" />
    </div>
    <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm">&copy; {new Date().getFullYear()} Cimovfi App. All rights reserved.</div>
          <div className="space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
            <a href="#" className="hover:text-gray-400">Contact</a>
          </div>
        </div>
      </footer></>
  );
}

export default Action;