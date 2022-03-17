//require('express')//return fn stored in var express
const express = require("express");
const app = express();//app object created

//whn '/' hits, this callbk run and send to browser

app.get('/', (req,res)=>{
  res.send('hello');
});
//this route return list of courses
app.get("/api/courses", (req, res) => {
  res.send([1,2,3]);
});

app.listen(3000, ()=>{
  console.log('server listening');
})


