const mongoose = require('mongoose');
const Seat = require('../models/seat.model');

const concertSchema = mongoose.Schema({
  performer: {
    type: String,
    required: true,
    ref: 'Performer',
  },
  genre: { type: String, enum: ['Rock', 'R&B', 'Pop'], required: true },
  price: { type: Number, required: true },
  day: { type: Number, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Concert', concertSchema);
