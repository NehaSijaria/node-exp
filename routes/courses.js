const express = require('express');
const router = express.Router();
const Joi = require('joi'); //return class

const courses = [
  { ids: 1, name: "java" },
  { ids: 2, name: "html" },
  { ids: 3, name: "css" },
];

// /api/course: courses
//this route return list of all courses
router.get("/", (req, res) => {
  res.send([1, 2, 3, 4, 5]);
});
//this route return single courses(id of course)
router.get("/:id", (req, res) => {
  console.log(req.params.id);
  res.send(req.params.id);
});
//multiple route paramas
router.get("/:stack/:name", (req, res) => {
  //console.log(req.params);
  res.send(req.params);
});
//{"frontend":"frontend","java":"java"}
//
router.get("/:stack/:name", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});

;
//getting single couses
router.get("/api/:ids", (req, res) => {
  //req.params.id return string
  const course = courses.find(
    (course) => course.ids === parseInt(req.params.ids)
  );
  console.log(course);
  if (!course) return res.status(404).send("Not found");
  //Error 404

  res.send(course.name);
});
//app.use(express.json())
//read req.body(json format) and change it to object and set it back in req.body
//handling post request
//we will post to the colloection of courses : so plural
router.post("/", (req, res) => {
  //we need to read the body
  //input validations
  // if(!req.body.name || req.body.name.length <3){
  //   res.status(400).send('Name required and must be 3 character')
  //   return;
  // }
  //Schema to show properties of object
  // const schema = {
  //   name: Joi.string().min(3).required()
  // }

  // const result = Joi.validate(req.body, schema);
  // console.log(result.error.details[0]);

  // if(result.error){
  //   res.status(400).send(result.error.details[0].message);
  //   return;
  // }

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    //name property in the body of object
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});
//Handling Put Request
router.put("/:ids", (req, res) => {
  //first we will find the course ;if not available show error 404
  const course = courses.find((c) => c.ids === parseInt(req.params.ids));

  if (!course) {
    return res.status(404).send("No course found to update");
  }
  //course
  //without refactoring
  //  const schema = {
  //    name: Joi.string().min(3).required(),
  //  };

  //  const result =  Joi.validate(req.body, schema);
  //  if (result.error) {
  //    res.status(400).send(result.error.details[0].message);
  //    return;
  //  }
  //REFACTORING CODE

  const { error } = validateCourse(req.body); //this fn return object with 2 propertoes: error and value, so we did obj destructuring
  if (error) return res.status(400).send(error.details[0].message);

  //now we find the course: so update that and return update course property
  course.name = req.body.name;
  //return updated course to client
  res.send(course);
});

//validation logic//argument will be req.body
function validateCourse(course) {
  //now validate the cousre first which you will be upodate with existng
  //validation criteria
  const schema = {
    name: Joi.string().min(3).required(),
  };
  //validate what sendng via req.body to schema: if error display err msg
  return Joi.validate(course, schema);
}
//
//Handle Delete
router.delete("/:ids", (req, res) => {
  //first we will find the course ;if not available show error 404
  const course = courses.find((c) => c.ids === parseInt(req.params.ids)); //{id: , name:}
  if (!course) {
    res.status(404).send("No course found to delete");
  }
  //when found particular course;find its index in courses
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
  //
});

module.exports = router;