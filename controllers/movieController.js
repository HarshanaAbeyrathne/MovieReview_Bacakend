// movieController.js
const multer = require('multer');
const Movie = require('../model/movie');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
});

const upload = multer({ storage: storage });

const addMovieImage = async (req, res) => {
    console.log(req.body);
    // res.send("Image uploaded successfully");

    //save image name to database
    const imageName = req.file.filename;
    
    try{
        await Movie.create({image: imageName});
        res.json({message: "Image uploaded successfully"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
};
const getMovieImage = async (req, res) => {
    try{
        Movie.find({}).then(data=>{
            res.json({status: "success", data: data});
        })
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

module.exports = {
    addMovieImage,
    upload,
    getMovieImage
};
