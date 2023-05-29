const express = require('express');
const multer = require('multer');
const revenueInsightController = require('../controllers/revenueInsightController')

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), revenueInsightController.generateInsights)

module.exports = router