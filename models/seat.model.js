const mongoose = require('mongoose');

const seatSchema = mongoose.Schema({
  seat: { type: Number, required: true },
  client: { type: String, required: true },
  email: { type: String, required: true },
  day: { type: Number, required: true },
  //   concert: { type: String, required: true, ref: 'Concert' },
});

module.exports = mongoose.model('Seat', seatSchema);
