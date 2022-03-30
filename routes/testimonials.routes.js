const express = require('express');
const router = express.Router();
const TestimonialsController = require('../controllers/testimonials.controller');

router.route('/testimonials').get(TestimonialsController.getAll);

router.route('/testimonials/random').get(TestimonialsController.getRandom);

router.route('/testimonials/:id').get(TestimonialsController.getOneById);

router.route('/testimonials').post(TestimonialsController.createOne);

router.route('/testimonials/:id').put(TestimonialsController.updateOne);

router.route('/testimonials/:id').delete(TestimonialsController.deletOne);

module.exports = router;
