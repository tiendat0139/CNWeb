import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const accessToken = req.headers.authorization.split(' ')[1];
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err){
      return res.status(401).json({
        message: "Unauthorized"
      })
    }
    req.authUser = decoded;
    next();
  });
}

export default verifyToken;