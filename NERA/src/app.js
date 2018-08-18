const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
const app = express();

//mongo connect
const mongoUrl = 'mongodb://localhost:27017/App1DB';
mongoose.connect(mongoUrl, {useNewUrlParser: true }, function(err, db) {
    if (err) console.log('Unable to connect to the server. Please start the server. Error:', err);
    else console.log('Connected to MongoDB Server successfully!');
});
mongoose.Promise = global.Promise;

//routes include
// const index = require('./api/routes/index');
const notes = require('./api/routes/notes');

//settings
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes use
// app.use(index);
app.use('/notes', notes);

//static files
app.use(express.static(path.join(__dirname, 'dist')));

//header options
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//         'Access-Control-Allow-Headers', 
//         'Origin, X-Requested-With, Content-Type, Accept, Autorization');
//     if(req.method === 'OPTIONS') {
//         req.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
//         return res.status(200).json({});
//     }
//     next();
// });

//error
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