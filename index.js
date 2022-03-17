//require('express')//return fn stored in var express
const express = require("express");
const app = express();//app object created
//data
const courses = [
  { ids:1, name:'java'},
  { ids:2, name:'html'},
  { ids:3, name: 'css'}
]
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

//getting all couses
app.get("/api/allcourses", (req, res) => {
  res.send(courses);
});
//getting single couses
app.get("/api/:ids", (req, res) => {
  //req.params.id return string
  const course = courses.find(course => course.ids === parseInt(req.params.ids))
  console.log(course)
  if(!course){
    //Error 404
    res.status(404).send('Not found')
  } else {
    res.send(course.name)
  }
});


//port dynamically assign  on deployment: not 4500
const port = process.env.PORT || 4500;
app.listen(port, ()=>{
  console.log(`server listening' on port : ${port}`);
})
// export PORT=4800 : setting port value to 4800

