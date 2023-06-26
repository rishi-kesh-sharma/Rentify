const asyncHandler = require("express-async-handler");
const User = require("../models/user.js");
const crypto = require("crypto");

const getAll = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ message: "user get successfull", users });
});

const getSingle = asyncHandler(async (req, res) => {
  const _id = req.params._id;
  const user = await User.findOne({ _id });
  res.status(200).json({ message: "user get successfull", user });
});
const update = asyncHandler(async (req, res) => {
  const _id = req.params._id;
  const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  res.status(200).json({ message: "Update User", user: updatedUser });
});
const remove = asyncHandler(async (req, res) => {
  const _id = req.params._id;
  const removedUser = await User.deleteOne({ _id });
  res.status(200).json({ message: "User removed", user: removedUser });
});

//desc  Auth user/set token
//route GET /api/users/auth
//access     Private

const getProfile = asyncHandler(async (req, res) => {
  console.log("in get profile");
  const user = req.user;
  res.status(200).json({ message: "  User Profile get success", user });
});

const updateProfile = asyncHandler(async (req, res) => {
  const _id = req.user._id;
  const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  res.status(200).json({ message: "Update User", user: updatedUser });
});
const removeProfile = asyncHandler(async (req, res) => {
  const _id = req.user._id.toString();
  try {
    const removedUser = await User.deleteOne({ _id });
    res.status(200).json({ message: "User removed", user: removedUser });
  } catch (err) {
    return console.log(err);
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const _id = req.user._id;
  const { oldPassword, password, confirmPassword } = req.body;
  if (!oldPassword) {
    throw new Error("old password is empty");
  } else if (!password) {
    throw new Error("new password is empty");
  } else if (!confirmPassword) {
    throw new Error("confirm password is empty");
  }

  if (confirmPassword !== password) {
    throw new Error("new password and confirm password doesnot match");
  }
  const user = await User.findById(_id);

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new Error("old passwords doesnot match");
  }
  user.password = password;
  await user.save();
  res.status(200).json({ message: "password changed successfully", user });
});
module.exports = {
  getAll,
  getSingle,
  update,
  remove,
  getProfile,
  updateProfile,
  removeProfile,
  changePassword,
};
