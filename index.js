const mongoose = require('mongoose');
const movies = require('./routes/movies');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/movies')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

//app.use(express.json());
app.use(express.json({
  type: ['application/json', 'text/plain']
}));
app.use('/api/movies', movies);
/*app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With'); //Add other headers used in your requests

  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});*/


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));