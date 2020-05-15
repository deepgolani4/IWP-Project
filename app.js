require('./models/db')
const express = require('express');
const cors=require('cors');
const app = express();
const path = require('path');
const bodyparser=require('body-parser')
const PORT=process.env.PORT || 5000;

//body-prser
app.listen(PORT,()=>{
    console.log('liatening on 5000');
});

//ejs to html server handling
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({
    extended: true
}));
// using index and user 
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));




module.exports = app;