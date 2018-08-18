const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//new
const path = require("path");
var cookieParser = require('cookie-parser');
var routes = require('./api/routes/index');
//new

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb://localhost:27017/App1DB',  
{useNewUrlParser: true });
mongoose.Promise = global.Promise;


// view engine setup 
//new
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//new

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//new
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//new


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Autorization');
    if(req.method === 'OPTIONS') {
        req.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

//new
app.use('/', routes);
//new

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

module.exports = app;