const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/iwp";
var db = require('../myapp/routes/db')

//body-prser
app.use(express.urlencoded({ extended: false }));

//connections
db.connect((err) => {
    if (err) {
        console.log("can't connect");
        process.exit(1);
    } else {
        app.listen(3000, () => {
            console.log('listening on port 3000');

        });
    }
});

//ejs to html server handling
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.json());

// using index and user 
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));




module.exports = app;