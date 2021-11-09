const Joi = require('joi');
const mongoose = require('mongoose');

const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  openingText: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 50
  },
  releaseDate: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10
  }
}));

function validateMovie(movie) {
  //console.log('Movie Title:' + movie.title);
  const schema = {
    title: Joi.string().min(3).max(50).required(),
    openingText: Joi.string().min(0).max(50).required(),
    releaseDate: Joi.string().min(10).max(10).required()
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie; 
exports.validate = validateMovie;