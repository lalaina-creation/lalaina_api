require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const multer = require("multer");
const cors = require('cors');
const bodyParser = require('body-parser');

const colors = require('colors');
const router = require('./routes/router');
const winston = require('winston');

const app = express();
app.use(cors(
  {
    origin: [
      '*',
      'http://localhost:3000',
      'https://lalaina-creation.thomas-jan.fr',
      'https://lalaina-creation-front.thomas-jan.fr'
    ],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  }
));

app.locals.users = {};
app.use(express.json({ limit: '50mb' }));

//Logs
const logger = winston.createLogger({
  level: 'info', // Log level
  format: winston.format.json(), // Log format (you can customize this)
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
    new winston.transports.File({ filename: 'combined.log' }) // Log all other messages to another file
  ]
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  logger.info(`${req.requestTime} -- ${req.method} ${req.url}`);
  //add timestamp

  next();
});

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something went wrong!');
});



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router);


//make uploads folder public
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Lalaina API is running !');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    return res.status(404).send({ message: 'Route '+req.url+' Not found.' });
//   next(createError(404));
});

app.listen(4000, () => 
  console.log(colors.bold.underline.magenta(`Server running on port ${colors.bold.yellow('4000')}`))
);


module.exports = app;
