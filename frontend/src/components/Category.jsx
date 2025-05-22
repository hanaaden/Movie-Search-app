import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieList from './movies-list';

function Category() {
  const { categoryName } = useParams();
  const [movies, setMovies] = useState([]);

  // Manual list of movies with IDs and image URLs
  const manualMovies = [
    { id: 1, title: 'Movie 1', poster: 'https://image.tmdb.org/t/p/w500/path_to_image_1.jpg' },
    { id: 2, title: 'Movie 2', poster: 'https://image.tmdb.org/t/p/w500/path_to_image_2.jpg' },
    { id: 3, title: 'Movie 3', poster: 'https://image.tmdb.org/t/p/w500/path_to_image_3.jpg' },
  ];

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      try {
        const res = await fetch(`https://movie-search-app-s8nw.onrender.com/api/category/${categoryName}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setMovies(data.results);
      } catch (err) {
        console.error('Error fetching movies by category:', err);
      }
    };

    fetchMoviesByCategory();
  }, [categoryName]);

  return (
    <div className="p-4">
      <h1 className="text-white text-2xl mb-4">{categoryName} Movies</h1>
      <MovieList movies={movies} title={`Movies in ${categoryName}`} />

      <h2 className="text-white text-xl mb-2">Manual Movie List</h2>
      <div className="flex flex-wrap justify-center">
        {manualMovies.map(movie => (
          <div key={movie.id} className="m-4">
            <img
              className="w-48 h-64 rounded"
              src={movie.poster}
              alt={movie.title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
              }}
            />
            <p className="text-white text-center">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;