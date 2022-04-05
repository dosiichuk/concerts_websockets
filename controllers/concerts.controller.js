const Concert = require('../models/concert.model');
const Performer = require('../models/performer.model');
const Seat = require('../models/seat.model');

exports.getAll = async (req, res, next) => {
  try {
    const seats = await Seat.find();
    let concerts = await Concert.find().populate(['performer']);

    concerts = concerts.map((concert) => {
      concert = concert.toObject();
      concert.freeSeats =
        50 - seats.filter((seat) => seat.day === concert.day).length;
      return concert;
    });
    res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const concert = await Concert.findOne().skip(rand);
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json({ data: concert });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOneById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json({ data: concert });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.createOne = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer, genre, price, day, image });
    await newConcert.save();
    res.json({ message: 'ok', data: newConcert });
  } catch (err) {
    res.status.json({ message: err });
  }
};

exports.updateOne = async (req, res) => {
  try {
    await Concert.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true },
      (error, doc) => {
        if (error) {
          res.status(404).json({ message: error });
        } else {
          res.status(200).json({ message: 'OK', data: { doc } });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ message: err, here: '' });
  }
};

exports.deletOne = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (concert) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK', data: { concert } });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPerformer = async (req, res) => {
  try {
    const concerts = await Concert.find({
      performer: req.params.performer,
    });
    if (concerts) {
      res.json({ message: 'OK', data: concerts });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

exports.getByGenre = async (req, res) => {
  try {
    const concerts = await Concert.find({
      genre: req.params.genre,
    });
    if (concerts) {
      res.json({ message: 'OK', data: concerts });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

exports.getByPriceRange = async (req, res) => {
  try {
    const concerts = await Concert.find({
      $and: [
        { price: { $lte: parseFloat(req.params.price_max) } },
        { price: { $gte: parseFloat(req.params.price_min) } },
      ],
    });
    if (concerts) {
      res.json({ message: 'OK', data: concerts });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

exports.getByDay = async (req, res) => {
  try {
    const concerts = await Concert.find({
      day: parseInt(req.params.day),
    });
    if (concerts) {
      res.json({ message: 'OK', data: concerts });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};
