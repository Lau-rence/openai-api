const express = require('express');
const bodyParser = require( 'body-parser');
const multer = require('multer');
const dotenv = require( 'dotenv');
const revenueInsightRoutes = require('./routes/revenueInsight')

const app = express();
app.use(bodyParser.json());
dotenv.config();

app.use('/generate-revenue-activity-insight', revenueInsightRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server is listening on port ' + process.env.PORT);
});
