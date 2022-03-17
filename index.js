//require('express')//return fn stored in var express
const express = require("express");
const app = express();//app object created

//whn '/' hits, this callbk run and send to browser

app.get('/', (req,res)=>{
  res.send('hello');
});
//this route return list of courses
app.get("/api/courses", (req, res) => {
  res.send([1,2,3,4,5]);
});
//port dynamically assign  on deployment: not 4500
const port = process.env.PORT || 4500;
app.listen(port, ()=>{
  console.log(`server listening' on port : ${port}`);
})
// export PORT=4800 : setting port value to 4800

