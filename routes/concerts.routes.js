const express = require('express');
const router = express.Router();
const ConcertsController = require('../controllers/concerts.controller');

router.route('/concerts').get(ConcertsController.getAll);

router.route('/concerts/random').get(ConcertsController.getRandom);

router.route('/concerts/:id').get(ConcertsController.getOneById);

router.route('/concerts').post(ConcertsController.createOne);

router.route('/concerts/:id').put(ConcertsController.updateOne);

router.route('/concerts/:id').delete(ConcertsController.deletOne);

module.exports = router;
