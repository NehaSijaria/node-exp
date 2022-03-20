//const config = require('./config')
const morgan = require('morgan');
const helmet = require("helmet");
const bodyParser = require("body-parser");
const Joi = require('joi'); //return class
const startupDebugger = require('debug')('app:startup')
const dbDebug = require("debug")("app:db");
const logger = require("./logger");
const courses = require('./courses')
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

//whn '/' hits, this callbk run and send to browser

app.get('/', (req,res)=>{
  //res.send('hello');
  res.render('index', { title: 'exp-app', msg: 'hello' })
});

//port dynamically assign  on deployment: not 4500
const port = process.env.PORT || 4500;
app.listen(port, ()=>{
  console.log(`server listening' on port : ${port}`);
})
// export PORT=4800 : setting port value to 4800

