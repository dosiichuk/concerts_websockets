const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let db = require('../db');

router.route('/seats').get((req, res, next) => {
  console.log('getting seats');
  res.status(200).json(db.seats);
  req.io.emit('updatedSeats', db.seats);
});

router.route('/seats/random').get((req, res) => {
  const id = Math.floor(Math.random() * db.seats.length) + 1;
  console.log(id);
  const foundItem = db.seats.filter((item) => item.id === id);
  if (foundItem.length > 0) {
    res.json(foundItem);
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

router.route('/seats/:id').get((req, res) => {
  const { id } = req.params;
  const foundItem = db.seats.filter((item) => item.id === parseInt(id));
  if (foundItem.length > 0) {
    res.json(foundItem);
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

router.route('/seats').post((req, res) => {
  console.log('adding seat');
  const { day, seat, client, email } = req.body;
  if (db.seats.some((entry) => entry.day === day && entry.seat === seat)) {
    return res.status(409).json({
      message: 'The seat is already taken',
    });
  }
  db.seats.push({ day, seat, client, email, id: uuidv4() });
  res.status(200).json(db.seats);
  req.io.emit('updatedSeats', db.seats);
});

router.route('/seats/:id').put((req, res) => {
  const { id } = req.params;
  const foundItem = db.seats.filter((item) => item.id === parseInt(id));
  if (foundItem.length > 0) {
    db.seats = db.seats.map((item) =>
      item.id == id ? { ...item, ...req.body } : item
    );
    res.status(200).json({
      message: 'modified',
      data: db.seats,
    });
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

router.route('/seats/:id').delete((req, res) => {
  const { id } = req.params;
  const foundItem = db.seats.filter((item) => item.id === parseInt(id));
  if (foundItem.length > 0) {
    db.seats = db.seats.filter((item) => item.id != id);
    res.json({
      message: 'deleted',
      data: db.seats,
    });
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

module.exports = router;
