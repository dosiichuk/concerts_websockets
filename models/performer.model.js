const mongoose = require('mongoose');

const performerSchema = mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, enum: ['Rock', 'R&B', 'Pop'], required: true },
});

module.exports = mongoose.model('Performer', performerSchema);
