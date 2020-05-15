const mongoose = require('mongoose');


const userschema = new mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    },
    password2: {
        type: String,
    },


});
mongoose.model('user',userschema);

