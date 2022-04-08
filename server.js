const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
dotenv.config({ path: './config.env' });

const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

//middleware adding io object to req
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

// connects our backend code with the database

const NODE_ENV = process.env.NODE_ENV;
let dbUrl = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
if (NODE_ENV === 'test') dbUrl = 'mongodb://localhost:27017/newwaveDBtest';

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

//let us know whether connection was successfull
db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket');
});

module.exports = server;
