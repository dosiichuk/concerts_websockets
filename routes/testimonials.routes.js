const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let db = require('../db');

router.route('/testimonials').get((req, res, next) => {
  res.status(200).json({
    message: 'ok',
    data: db.testimonials,
  });
});

router.route('/testimonials/random').get((req, res) => {
  const id = Math.floor(Math.random() * db.testimonials.length) + 1;
  console.log(id);
  const foundItem = db.testimonials.filter((item) => item.id === id);
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

router.route('/testimonials/:id').get((req, res) => {
  const { id } = req.params;
  const foundItem = db.testimonials.filter((item) => item.id === parseInt(id));
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

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  db.testimonials.push({ author, text, id: uuidv4() });
  res.status(200).json({
    message: 'added',
    data: db.testimonials,
  });
});

router.route('/testimonials/:id').put((req, res) => {
  const { id } = req.params;
  const foundItem = db.testimonials.filter((item) => item.id === parseInt(id));
  if (foundItem.length > 0) {
    db.testimonials = db.testimonials.map((item) =>
      item.id == id ? { ...item, ...req.body } : item
    );
    res.status(200).json({
      message: 'modified',
      data: db.testimonials,
    });
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

router.route('/testimonials/:id').delete((req, res) => {
  const { id } = req.params;
  const foundItem = db.testimonials.filter((item) => item.id === parseInt(id));
  if (foundItem.length > 0) {
    db.testimonials = db.testimonials.filter((item) => item.id != id);
    res.json({
      message: 'deleted',
      data: db.testimonials,
    });
  } else {
    res.status(404).json({
      message: 'not found',
    });
  }
});

module.exports = router;
