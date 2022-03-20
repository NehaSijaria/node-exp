function log (req,res,next) {
  console.log('logging');
  next();
}
//exports single function
module.exports  = log;