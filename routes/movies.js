const {Movie, validate} = require('../models/movie'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('title');
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3001");
  res.send(movies);
});

router.post('/', async (req, res) => {
  console.log('request:', req.body);
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let movie = new Movie({ 
    title: req.body.title,
    openingText: req.body.openingText,
    releaseDate: req.body.releaseDate
  });
  movie = await movie.save();
  
  //res.setHeader("Access-Control-Allow-Origin","http://localhost:3001");
  res.send(movie);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      openingText: req.body.openingText,
      releaseDate: req.body.releaseDate
    }, { new: true });

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

module.exports = router; 