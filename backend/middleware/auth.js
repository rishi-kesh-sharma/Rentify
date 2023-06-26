const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticate = asyncHandler(async (req, res, next) => {
  try {
    const token = req?.cookies?.token || req.headers?.authorization;
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const _id = decodedData._id;
    const user = await User.findById(_id);
    req.user = user;
    next();
  } catch (err) {
    throw new Error("cannot decode token");
  }
});

module.exports = { authenticate };
