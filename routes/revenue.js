const express = require('express');
const multer = require('multer');
const revenueController = require('../controllers/revenueController')

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), revenueController.generateInsights)

module.exports = router