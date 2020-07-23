const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());

require('dotenv').config();

const userRoute = require('./router');

mongoose.Promise = global.Promise;
mongoose
  .connect(
    `mongodb://${process.env.REACT_APP_DB_USER}:${process.env.REACT_APP_DB_PASS}@ds159489.mlab.com:59489/${process.env.REACT_APP_DB_HOST}`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log('DB Connected'))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use('/', userRoute);

app.listen(process.env.REACT_APP_PORT, () => {
  console.log('Connected to port ' + process.env.REACT_APP_PORT);
});

app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
