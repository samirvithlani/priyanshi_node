const jwt = require("jsonwebtoken");
const secret = "samir";

const validateToken = (req, res, next) => {
  //req.headers
  var token = req.headers.authorization;
  try {
    if (token) {
        //check token is bearer or not
        if(token.startsWith("Bearer ")){
            //remove Bearer
            var token = token.split(" ")[1]
            //verify
            const decoded = jwt.verify(token,secret) // catch..
            console.log(decoded)
            next()
        }
        else{
            res.json({
                message:"token is not Bearer token"
            })
        }

    } else {
      res.json({
        message: "token is missing..",
      });
    }
  } catch (err) {
    res.json({
      err: err,
    });
  }
};

module.exports = {
    validateToken
}