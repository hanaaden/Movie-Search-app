import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movie from './components/movie';
import MovieDetails from './components/MovieDetails';
import Popular from './components/Popular';
import Trending from './components/Trending';
import Action from './components/Action';
import Comedy from './components/Comedy';
import Drama from './components/Drama';
import Horror from './components/Horror';
import SciFi from './components/SciFi';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Movie />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/trending" element={<Trending />} />
       
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/category/action" element={<Action />} />
        <Route path="/category/comedy" element={<Comedy />} />
        <Route path="/category/drama" element={<Drama />} />
        <Route path="/category/horror" element={<Horror />} />
        <Route path="/category/sci-fi" element={<SciFi />} />
      </Routes>
    </Router>
  );
}

export default App;