const Movie = require('../model/Movie');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const addMovieImage = upload.single('image');

const createMovie = async (req, res) => {
  const { title, year, director, description } = req.body;
  
  // Check if req.file exists before accessing its properties
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload an image file' });
  }

  const image = req.file.filename;

  try {
    const newMovie = await Movie.create({ title, year, director, description, image });
    res.status(201).json({ message: 'Movie created successfully', newMovie });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = {
  addMovieImage,
  createMovie,
  getMovies,
};
