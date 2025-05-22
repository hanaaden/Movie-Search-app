import React, { useState, useEffect } from 'react';

const MovieSlideshow = () => {
  const [movies, setMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch('https://mern-app-movie-search.onrender.com/api/trending');
        const data = await res.json();
        setMovies(data.results.slice(0, 4));
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % movies.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [movies]);

  if (loading) return <div>Loading slideshow...</div>;

  return (
    <div className="relative w-full h-128 overflow-hidden rounded-lg shadow-lg">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {movies.map((movie) => (
          <div key={movie.id} className="min-w-full h-128 relative">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/1920x1080?text=No+Backdrop';
              }}
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white p-3">
              {movie.title}<br />
              Release Date: {movie.release_date}
            </div>
          </div>
        ))}
      </div>
      <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full" onClick={() => setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length)}>&#10094;</button>
      <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full" onClick={() => setCurrentSlide((prev) => (prev + 1) % movies.length)}>&#10095;</button>
    </div>
  );
};

export default MovieSlideshow;
