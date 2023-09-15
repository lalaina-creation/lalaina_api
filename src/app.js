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
app.use(cors());

app.locals.users = {};

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


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Files will be stored in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    // Generate a unique filename by adding a timestamp
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    const filename = `${timestamp}${extension}`;
    cb(null, filename);
  },
});

// Create an instance of the multer middleware with the defined storage options
const upload = multer({ storage: storage });

app.use("/api/uploads", express.static("uploads"));

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file provided" });
  }

  const fileUrl = `/uploads/${req.file.filename}`;

  // You can save the fileUrl to a database or perform other actions here

  res.status(200).json({ fileUrl });
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
