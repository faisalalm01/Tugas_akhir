const express = require('express');
var cors = require('cors')
const createError = require('http-errors')
const app = express();
const morgan = require('morgan');
const path = require('path')
const {HTTP_STATUS} = require('./src/helpers/constant/http_status');
const {SUCCESS, ERROR} = require('./src/helpers/constant/http_message');
require('dotenv');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cors());

global.MSG = require(path.join(__dirname, '/src/helpers/response'));
global.HTTP_STATUS = HTTP_STATUS;
global.SUCCESS = SUCCESS;
global.ERROR = ERROR;

app.get('/', async (req, res, next) => {
    res.send({ message: 'Greaat, Server it Work! 🐻' })
});

app.use('/api', require('./src/routes/api.routes'));

app.use((req, res, next) => {
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen( PORT, () => {
    console.log(`Server run on port http://localhost:${PORT} 🚀`);
});
