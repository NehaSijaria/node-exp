const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //res.send('hello');
  res.render("index", { title: "exp-app", msg: "hello" });
});

module.exports = router;