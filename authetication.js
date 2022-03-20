function authetication (req, res, next) {
  console.log("Authenticating");
  next();
}

module.exports = authetication;