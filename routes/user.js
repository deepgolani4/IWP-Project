const express = require('express');
const router = express.Router();
const user = require('../models/User');
var mongoose = require('mongoose');
const db = require("./db");


const collection = {
        //want=true
        login: "doctorlogin",
        plogin: "login"

    }
    //register hande

router.get('/login', (req, res) => {
    res.render('login', {})
});

//sign up for patient

router.post('/login', (req, res, next) => {
    // console.log(req.body);
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
        "password2": password2,
        "namepl": namepl,
        "passwordpl": passwordpl,
        "namedl": namedl,
        "passworddl": passowrddl

    }
    if (!username || !address || !phone || !password || !password2 || !namedl || !passowrddl) {

        db.getDB().collection(collection.plogin).find({ username: data.namepl }).toArray().then((doc) => {
            if (doc == []) {
                res.send('user not found');
            } else {
                res.json({ success: true });
            }
        })

    } else {
        if (!namedl || !passowrddl) {

            db.getDB().collection(collection.plogin).find({ username: data.username }).toArray((err, doc) => {
                db.getDB().collection(collection.plogin).insertOne(data, (err, result) => {
                    if (err) {
                        const error = new error("failed");
                        next(error);
                    } else {
                        console.log("success");
                        res.jsonp({ success: false });
                        next();
                    }
                });
            });

        } else {

            db.getDB().collection(collection.login).find({ username: data.namedl }).toArray().then((doc) => {
                if (doc == []) {
                    res.send('user not found');
                } else {
                    res.json({ success: false1 });
                }
            })

        }
    }
});



module.exports = router;