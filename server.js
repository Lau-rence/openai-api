const express = require('express');
const bodyParser = require( 'body-parser');
const dotenv = require( 'dotenv');
const chatRoutes = require('./routes/revenue')

const app = express();
app.use(bodyParser.json());
dotenv.config();

app.use('/revenue', chatRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server is listening on port ' + process.env.PORT);
});
