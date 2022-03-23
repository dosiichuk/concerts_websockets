const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let db = require('../db');

router.route('/concerts').get((req, res, next) => {
  res.status(200).json({
    message: 'ok',
    data: db.concerts,
  });
});

router.route('/concerts/random').get((req, res) => {
  const id = Math.floor(Math.random() * db.concerts.length) + 1;
  console.log(id);
  const foundItem = db.concerts.filter((item) => item.id === id);
  if (foundItem.length > 0) {
    res.json({
      message: 'ok',
      data: foundItem,
    });
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

router.route('/concerts/:id').get((req, res) => {
  const { id } = req.params;
  const foundItem = db.concerts.filter((item) => item.id === parseInt(id));
  if (foundItem.length > 0) {
    res.json({
      message: 'ok',
      data: foundItem,
    });
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  db.concerts.push({ performer, genre, price, day, image, id: uuidv4() });
  res.status(200).json({
    message: 'added',
    data: db.concerts,
  });
});

router.route('/concerts/:id').put((req, res) => {
  const { id } = req.params;
  const foundItem = db.concerts.filter((item) => item.id === parseInt(id));
  if (foundItem.length > 0) {
    db.concerts = db.concerts.map((item) =>
      item.id == id ? { ...item, ...req.body } : item
    );
    res.status(200).json({
      message: 'modified',
      data: db.concerts,
    });
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

router.route('/concerts/:id').delete((req, res) => {
  const { id } = req.params;
  const foundItem = db.concerts.filter((item) => item.id === parseInt(id));
  if (foundItem.length > 0) {
    db.concerts = db.concerts.filter((item) => item.id != id);
    res.json({
      message: 'deleted',
      data: db.concerts,
    });
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

module.exports = router;
