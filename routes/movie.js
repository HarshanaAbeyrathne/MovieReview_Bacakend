// movieRoutes.js
const express = require('express');
const router = express.Router();
const { addMovieImage, upload, getMovieImage } = require('../controllers/movieController');

// Add a movie
router.post('/addmovie', upload.single("image"), addMovieImage);

//get movie
router.get('/getmovie', getMovieImage);

module.exports = router;
