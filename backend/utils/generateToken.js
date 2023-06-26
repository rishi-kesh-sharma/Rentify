//Creating a token

const jwt = require("jsonwebtoken");

const generateToken = (res, _id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1D",
  });
  return token;
  //saving a token in a cookie
};
module.exports = generateToken;
