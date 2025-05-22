import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MovieList({ movies: propMovies, title = "Trending now" }) {
  const [movies, setMovies] = useState(propMovies || []);
  const [loading, setLoading] = useState(!propMovies);

  useEffect(() => {
    if (!propMovies) {
      const fetchMovies = async () => {
        try {
          const res = await fetch('https://movie-search-app-s8nw.onrender.com/api/trending');
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await res.json();
          setMovies(data.results);
        } catch (err) {
          console.error('Error fetching movies:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchMovies();
    }
  }, [propMovies]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full h-full border-4 border-gray-800 mt-12">
      <div className="text-4xl text-gray-600 font-bold p-4 text-center">{title}</div>
      <div className="flex flex-wrap justify-center">
        {movies.map((movie) => (
          <div key={movie.id} className="border-4 border-gray-800 w-64 m-4 flex flex-col items-center p-4">
            <img
              className="w-48 h-64"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
              }}
            />
            <p className="text-2xl text-gray-600 font-bold text-center">{movie.title}</p>
            <Link to={`/movie/${movie.id}`}>
              <button className="bg-gray-500 p-2 text-white rounded hover:bg-gray-600 transition mt-2">WATCH NOW</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;