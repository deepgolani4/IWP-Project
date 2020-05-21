const express = require('express');
const router = express.Router();
const user = require('../models/User');
const patDetails = require('../models/doctor');
var mongoose = require('mongoose');
const Login = mongoose.model('user');
var MongoClients = require('mongodb').MongoClient;
const path = require('path');
var session = require('express-session');
const body_parser=require('body-parser');
var JSAlert = require('js-alert');


const docData =mongoose.model('patDetails',
{medicine: {
    type: String,
},
patname: {
    type:String,
},
pathistory: {
    type: String,
},
}
);
const db = require("../models/db");
router.use(body_parser.json());
router.use(express.json());

const collection = {
        //want=true
        login: "doctorlogin",
        plogin: "login",
        patDetails:"patdetails"

    }
    //register hande

router.get('/login', (req, res) => {
    res.render('login', {})
});


function insertRecord(req,res) {
    var login=new Login();
    login.name = req.body.nameps;
    login.username = req.body.usernameps;
    login.address = req.body.addressps;
    login.phone = req.body.phoneps;
    login.password = req.body.Passwordps;
    login.password2 = req.body.Password2ps;
    const usrname = req.body.usernameps;
    const password =req.body.Passwordps;
    const password2 = req.body.Password2ps;
    console.log(usrname);
    
    login.save((err,doc) => {
        if(!err) {
            Login.findOne({username:usrname,password:password},function(err, user) {
                if (user) {
                    console.log('sign up succesfull');

                    res.render('patient',{patientName:`patient : ${doc.name}`,medicine:"doctor will add your medicine then you can see it",patHistory:"doctor will add up your history then you can see it"});
                    console.log(user)
                } else {
                    console.log("username is alreay taken");
                    // window.alert("credintials is alerdy taken")
                    JSAlert.alert("this is taken");
                    res.render('login',{})
                    console.log(user);
                }
            })
        
        }
            else {
            console.log('error during record insertion');
            // window.alert("error during login,please try again");
            }
    });                                   
}
function insertPatDetails(req,res) {
    var patDetail=new docData()
    const nameOfMed=req.body.nameOfMed;
    const numberOfMed=req.body.numberOfMed;
    const NuberOfMedDay=req.body.NuberOfMedDay;
    const name=req.body.name;
    console.log(name);
    patDetail.patname=req.body.name;
    patDetail.pathistory=req.body.patHistory;
    var medDetails=`${nameOfMed}:${numberOfMed}:${NuberOfMedDay}`;
    patDetail.medicine=medDetails;
    patDetail.save((err,doc) => {
        if(!err) {
            console.log('successful');
            // window.alert("sign up succesfull");
        } else {
            console.log('error during insertion')
            // window.alert("error during insertion");
        }
    })

}




router.post('/login',(req,res,next) => {
    
    
    const name = req.body.nameps;
    const username = req.body.usernameps;
    const address = req.body.addressps;
    const phone = req.body.phoneps;
    const password = req.body.Passwordps;
    const password2 = req.body.Password2ps;
    const namepl = req.body.namepl;
    const passwordpl = req.body.Passwordpl;
    const namedl = req.body.Namedl;
    const passowrddl = req.body.Passworddl;


    let error = [];

    var data = {
        "name": name,
        "username": username,
        "address": address,
        "phone": phone,
        "password": password,
        "password2": password2
        

    }

    var logindata = {
        "namepl": namepl,
        "passwordpl": passwordpl
        
    }

    var doctorData = {
        "namedl":namedl,
        "passowrddl":passowrddl
    } 


    if ( username || address || name || phone || password || password2 ) {
        insertRecord(req,res);
    } else {
        if (namepl || passwordpl ) {
            
            
            Login.findOne({ username:logindata.namepl, password:logindata.passwordpl}, function(err, user) {
                if(err) {
                    console.log(err);
                    return res.status(500).send();
                
                }

                if(!user) {
                    
                    console.log('user not found');
                    JSAlert.alert("credintial is wrong");
                    // window.alert("credintial is wrong");
                    res.render('login')
                } else {

                    docData.findOne({patname:logindata.namepl},function(err, docs) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (docs.medicine) {
                                console.log('doctor will import record shortlery ');
                                // window.alert("docctor will insert your medicine shorty try login after some time");
                                console.log('login',{})
                            }
                            res.render('patient',{patientName:`Patientname:${logindata.namepl}`,medicine:`${docs.medicine}`,patHistory:`${docs.pathistory}`});
                        }
                    })
                    
                    // res.render('patient',{patientName:`patientname:${logindata.namepl}`,medicine:"1234"});
                    // res.sendFile(path.join(__dirname,'../views/patient.html'));
                }

                
            })
            
            } else {

                if (namedl || passowrddl ) {
                
                Login.findOne({ username:doctorData.namedl, password:doctorData.passowrddl}, function(err, user) {
                    if(err) {
                        console.log(err);

                    }

                    if(!user) {
                        console.log('doctor credintials not found')
                        // window.alert("doctor credintial is not found")
                        // window.alert("doctor credintial not found");
                        res.render('login');
                    } else {
                        console.log("doctor login success");
                        // res.render('doctor',{});
                        res.redirect('/user/doctor')
                        // Login.find({}, function(err,doc) {
                        //     if (err) {
                        //         console.log(err);
                        //     } else {
                        //         res.render('doctor',{})
                        //         console.log(doc.name);
                        //         // console.log(doc);
                        //         // console.log(doc);
                        //     }
                        // });
                        
                    }
                })
                }
        }
    }
    

})


router.get('/doctor', (req, res) => {
    res.render('doctor', {})
    
});

router.get('/login', (req, res) => {
    res.render('doctor', {})
});

router.post('/doctor',(req,res,next) => {
    // const patDetail=req.body;
    // const nameOfMed=req.body.nameOfMed;
    // const numberOfMed=req.body.numberOfMed;
    // const patHistory=req.body.patHistory;
    // console.log(patDetail);
    insertPatDetails(req,res);
});

router.get('/patient/open', (req, res) => {
    docData.find({}, function(err,doc) {
        if (err) {
            console.log(err);
        } else {
            res.json(doc);
            // console.log(doc);
        }
    });

    // docData.find((err,docs) => {
    //     if (!err) {
    //         console.log(err);
    //     } else {
    //         res.json(docs);
    //         console.log(docs);
    //     }
    // })
});

router.get('/logout',function(req,res) {
    // req.session.destroy(function(err){  
    //     if(err){  
    //         console.log(err); 
    //         Response.errorResponse(err.message,res); 
    //     }  
    //     else  
    //     {  
    //         Response.successResponse('User logged out successfully!',res,{}); 
    //     }  
    // });
    delete req.session;
    res.redirect("/")
})

router.get('/doctor/open', (req, res) => {
    Login.find({}, function(err,doc) {
        if (err) {
            console.log(err);
        } else {
            res.json(doc);
            // console.log(doc);
        }
    });
})


module.exports = router;






























//sign up for patient

// router.post('/login', (req, res, next) => {
//     // console.log(req.body);
//     const name = req.body.nameps;
//     const username = req.body.usernameps;
//     const address = req.body.addressps;
//     const phone = req.body.phoneps;
//     const password = req.body.Passwordps;
//     const password2 = req.body.Password2ps;
//     const namepl = req.body.namepl;
//     const passwordpl = req.body.Passwordpl;
//     const namedl = req.body.Namedl;
//     const passowrddl = req.body.Passworddl;


//     let error = [];

//     var data = {
//         "name": name,
//         "username": username,
//         "address": address,
//         "phone": phone,
//         "password": password,
//         "password2": password2,
//         "namepl": namepl,
//         "passwordpl": passwordpl,
//         "namedl": namedl,
//         "passworddl": passowrddl

//     }
//     if (!username || !address || !phone || !password || !password2 || !namedl || !passowrddl) {

//         db.getDB().collection(collection.plogin).find({ username: data.namepl }).toArray().then((doc) => {
//             if (doc == []) {
//                 res.send('user not found');
//             } else {
//                 res.render('patient',{})
                
//             }
//         })

//     } else {
//         if (!namedl || !passowrddl) {

//             db.getDB().collection(collection.plogin).find({ username: data.username }).toArray((err, doc) => {
//                 db.getDB().collection(collection.plogin).insertOne(data, (err, result) => {
//                     if (err) {
//                         const error = new error("failed");
//                         next(error);
//                     } else {
//                         console.log("success");
//                         res.jsonp({ success: false });
//                         next();
//                     }
//                 });
//             });

//         } else {

//             db.getDB().collection(collection.login).find({ username: data.namedl }).toArray().then((doc) => {
//                 if (doc == []) {rud operations nodejs
//                     res.send('user not found');
//                 } else {
//                     res.json({ success: false1 });
//                 }
//             })

//         }
//     }
// });



