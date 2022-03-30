const Concert = require('../models/concert.model');

exports.getAll = async (req, res, next) => {
  try {
    res.json({ data: await Concert.find() });
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
