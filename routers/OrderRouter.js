const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/OrderController');

router.get('/dashboard-food/:restaurantId', IndexController.getSummaryOrderFood );
router.get('/dashboard-category/:restaurantId', IndexController.getSummaryOrderCategory );

module.exports = router;