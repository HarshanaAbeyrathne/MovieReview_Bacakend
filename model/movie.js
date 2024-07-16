const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        // required: true
    },
    director: {
        type: String,
        // required: true
    },
    discipton: {
        type: String,
        // required: true
    },
    image: {
        type: String,
        // required: true
    },
},{ timestamps: true});

module.exports = mongoose.model('Movie', movieSchema);