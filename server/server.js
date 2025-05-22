require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const TMDB_API_KEY = process.env.TMDB_API_KEY || '6977944a2fc791aa08824486e3fc045c';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Mapping for genres
const genreMapping = {
  action: 28,
  comedy: 35,
  drama: 18,
  horror: 27,
  sciFi: 878
};

// Endpoint to fetch trending movies
app.get('/api/trending', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
      params: { api_key: TMDB_API_KEY }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trending movies' });
  }
});

// Endpoint to fetch movie details
app.get('/api/movie/:id', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${req.params.id}`, {
      params: { api_key: TMDB_API_KEY, language: 'en-US' }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

// Endpoint to search for movies
app.get('/api/search', async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ error: 'Missing search query' });
  }
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: { api_key: TMDB_API_KEY, query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

// Endpoint to fetch movies by category
app.get('/api/category/:category', async (req, res) => {
  const category = req.params.category.toLowerCase();
  const genreId = genreMapping[category];

  if (!genreId) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: { api_key: TMDB_API_KEY, with_genres: genreId }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies by category' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));