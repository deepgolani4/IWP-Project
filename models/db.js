const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;

const mongoose = require('mongoose');
const state={db:null};

mongoose.connect('mongodb://localhost:27017/iwpproject', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./User');

const getPrimaryKey = (_id) => {
    return ObjectID(_id);
}

const getDB = () => {
    return state.db;
}

module.exports = { getDB, getPrimaryKey };

