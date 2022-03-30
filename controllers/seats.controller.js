const Seat = require('../models/seat.model');

exports.getAll = async (req, res, next) => {
  try {
    console.log('getting seats');
    const seats = await Seat.find();
    res.status(200).json(seats);
    req.io.emit('updatedSeats', seats);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const seat = await Seat.findOne().skip(rand);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOneById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.createOne = async (req, res) => {
  console.log('adding seat');
  try {
    const { day, seat, client, email } = req.body;
    const seats = await Seat.find();
    if (seats.some((entry) => entry.day === day && entry.seat === seat)) {
      return res.status(409).json({
        message: 'The seat is already taken',
      });
    }
    const newSeat = new Seat({ day, seat, client, email });
    await newSeat.save();
    res.json({ message: 'ok', seat: newSeat });
    const updatedSeats = await Seat.find();
    req.io.emit('updatedSeats', updatedSeats);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.updateOne = async (req, res) => {
  try {
    await Seat.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true },
      (error, doc) => {
        if (error) res.status(404).json({ message: error });
        else res.status(200).json({ message: 'OK', data: { doc } });
      }
    );
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deletOne = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (seat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK', data: { seat } });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
