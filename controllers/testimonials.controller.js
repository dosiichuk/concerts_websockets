const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res, next) => {
  try {
    res.status(200).json({ data: await Testimonial.find() });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testimonial = await Testimonial.findOne().skip(rand);
    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json({ data: testimonial });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOneById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json({ data: testimonial });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.createOne = async (req, res) => {
  try {
    const newTestimonial = new Testimonial({ ...req.body });
    await newTestimonial.save();
    res.json({ message: 'ok' });
  } catch (err) {
    res.status.json({ message: err });
  }
};

exports.updateOne = async (req, res) => {
  try {
    await Testimonial.findOneAndUpdate(
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
    const testimonial = await Testimonial.findById(req.params.id);
    if (testimonial) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK', data: { testimonial } });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
