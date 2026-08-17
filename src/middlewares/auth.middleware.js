const jwt = require("jsonwebtoken");


async function  authArtist(req, res, next) {
const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const decoded= jwt.verify(token, process.env.JWT_SECRET);
  try {
    
    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "Forbidden, only artist can add music",
      });
    }

    next()

  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}


async function authUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const decoded= jwt.verify(token, process.env.JWT_SECRET);
  try {
    
    if (decoded.role !== "user") {
      return res.status(403).json({
        message: "Forbidden, only users can perform this action",
      });
    }

    next()

  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}



module.exports = {
  authArtist,
  authUser
};