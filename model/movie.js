const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    image: {
        type: String,
        required: true
    },
},{ timestamps: true});

module.exports = mongoose.model('Movie', movieSchema);