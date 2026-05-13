const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  try {

    const token =
  req.headers.authorization
    ?.replace("Bearer ", "");

    if (!token) {

      return res.status(401).json({

        message:
          "No token provided"

      });

    }

    const decoded =
      jwt.verify(
        token,
        "splitledgersecret"
      );

    req.userId = decoded.id;

    next();

  }

  catch (error) {

    res.status(401).json({

      message:
        "Invalid token"

    });

  }

};