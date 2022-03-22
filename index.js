//const config = require('./config')
const morgan = require('morgan');
const helmet = require("helmet");
const bodyParser = require("body-parser");

const startupDebugger = require('debug')('app:startup')
const dbDebug = require("debug")("app:db");
const logger = require("./logger");
const courses = require('./routes/courses')
const home = require('./routes/home')
const express = require("express");
const app = express();//app object created

//template engine
app.set('view engine', 'pug');
//app.set('views', './views');

const authenticate = require('./authetication');
//require('express')//return fn stored in var express

//move to separate module
// app.use(function(req,res,next){
//   console.log('logging');
//   next();
// })
app.use(express.json())
app.use(logger);
app.use(express.urlencoded({ extended: true}));
//read public file: static content
app.use(express.static('public'))
//logged each request
app.use(morgan('tiny'));
app.use('/api/courses', courses)
app.use("/", home);
//whn '/' hits, this callbk run and send to browser

//getting all couses
app.get("/api/allcourses", (req, res) => {
  res.send('courses');
})


//port dynamically assign  on deployment: not 4500
const port = process.env.PORT || 4500;
app.listen(port, ()=>{
  console.log(`server listening' on port : ${port}`);
})
// export PORT=4800 : setting port value to 4800

