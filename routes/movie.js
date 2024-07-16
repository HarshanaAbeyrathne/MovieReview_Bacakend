const express = require('express');
const { getMovies, createMovie, addMovieImage } = require('../controllers/movieController');

const router = express.Router();

// Add a movie
router.post('/addmovie', addMovieImage, createMovie);
router.get('/allmovie', getMovies);

module.exports = router