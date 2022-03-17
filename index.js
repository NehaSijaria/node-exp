//require('express')//return fn stored in var express
const express = require("express");
const app = express();//app object created

//whn '/' hits, this callbk run and send to browser

app.get('/', (req,res)=>{
  res.send('hello');
});
//this route return list of all courses
app.get("/api/courses", (req, res) => {
  res.send([1,2,3,4,5]);
});
//this route return single courses(id of course)
app.get("/api/courses/:id", (req, res) => {
  console.log(req.params.id);
  res.send(req.params.id);
});
//multiple route paramas
app.get("/api/courses/:stack/:name", (req, res) => {
  //console.log(req.params);
  res.send(req.params);
});
//{"frontend":"frontend","java":"java"}
//
app.get("/api/courses/:stack/:name", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});





//port dynamically assign  on deployment: not 4500
const port = process.env.PORT || 4500;
app.listen(port, ()=>{
  console.log(`server listening' on port : ${port}`);
})
// export PORT=4800 : setting port value to 4800

