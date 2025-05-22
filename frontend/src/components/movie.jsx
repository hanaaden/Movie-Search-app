import React, { useState } from 'react';
import MovieSlideshow from './slideshow';
import MovieList from './movies-list';
import { Link } from 'react-router-dom';

function Movie() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    try {
      const res = await fetch(`https://mern-app-movie-search.onrender.com/api/search?query=${searchTerm}`);
      const data = await res.json();
      setSearchResults(data.results);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  return (
    <>
      <header className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-800 text-white">
        <div className="text-lg font-bold">Cimovfi Search App</div>
        <div className="flex-grow mx-4 mt-2 md:mt-0">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full p-2 rounded border-white text-white border border-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <button onClick={handleSearch} className="bg-white text-black border border-white p-2 m-2 rounded hover:bg-gray-100">Search</button>
     <nav className="space-x-4 mt-2 md:mt-0">
  <Link to="/popular" className="hover:text-gray-400">Popular</Link>
  <Link to="/trending" className="hover:text-gray-400">Trending</Link>

</nav>
      </header>

      <div className="bg-gray-700 p-4">
        <h2 className="text-lg font-semibold text-white">Categories</h2>
       <div className="flex flex-wrap space-x-4 mt-2">
  <Link to="/category/action" className="bg-gray-600 hover:bg-gray-500 text-white py-1 px-3 rounded mb-2">Action</Link>
  <Link to="/category/comedy" className="bg-gray-600 hover:bg-gray-500 text-white py-1 px-3 rounded mb-2">Comedy</Link>
  <Link to="/category/drama" className="bg-gray-600 hover:bg-gray-500 text-white py-1 px-3 rounded mb-2">Drama</Link>
  <Link to="/category/horror" className="bg-gray-600 hover:bg-gray-500 text-white py-1 px-3 rounded mb-2">Horror</Link>
  <Link to="/category/sci-fi" className="bg-gray-600 hover:bg-gray-500 text-white py-1 px-3 rounded mb-2">Sci-Fi</Link>
</div>
      </div>

      {searchResults ? (
        <MovieList movies={searchResults} title={`Search Results for "${searchTerm}"`} />
      ) : (
        <>
          <div className="text-4xl text-gray-600 font-bold p-4">Trending now</div>
          <MovieSlideshow />
          <MovieList />
        </>
      )}
      
      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm">&copy; {new Date().getFullYear()} Cimovfi App. All rights reserved. Hana Aden Abdi</div>
          <div className="space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
            <a href="#" className="hover:text-gray-400">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Movie;