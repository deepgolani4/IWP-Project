const mongoose = require('mongoose');


const userschema = new mongoose.Schema({
    
    medicine: {
        type: String,
    },
    patientname: {
        type:String,
    },
    pathistory: {
        type: String,
    },
   


});
mongoose.model('patdetails',userschema);

