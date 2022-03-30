const express = require('express');
const router = express.Router();
const SeatsController = require('../controllers/seats.controller');

router.route('/seats').get(SeatsController.getAll);

router.route('/seats/random').get(SeatsController.getRandom);

router.route('/seats/:id').get(SeatsController.getOneById);

router.route('/seats').post(SeatsController.createOne);

router.route('/seats/:id').put(SeatsController.updateOne);

router.route('/seats/:id').delete(SeatsController.deletOne);

module.exports = router;
