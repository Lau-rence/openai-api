const express = require('express');
const router = express.Router();
const revenueController = require('../controllers/revenueController')

router.post('/', revenueController.generateChatResponse)

module.exports = router