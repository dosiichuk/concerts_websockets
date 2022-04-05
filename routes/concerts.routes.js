const express = require('express');
const router = express.Router();
const ConcertsController = require('../controllers/concerts.controller');

router.route('/concerts').get(ConcertsController.getAll);

router.route('/concerts/random').get(ConcertsController.getRandom);

router.route('/concerts/:id').get(ConcertsController.getOneById);

router.route('/concerts').post(ConcertsController.createOne);

router.route('/concerts/:id').put(ConcertsController.updateOne);

router.route('/concerts/:id').delete(ConcertsController.deletOne);

//additional routes for testing
router
  .route('/concerts/performer/:performer')
  .get(ConcertsController.getByPerformer);

router.route('/concerts/genre/:genre').get(ConcertsController.getByGenre);

router
  .route('/concerts/price/:price_min/:price_max')
  .get(ConcertsController.getByPriceRange);

router.route('/concerts/day/:day').get(ConcertsController.getByDay);

module.exports = router;
