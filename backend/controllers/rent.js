const asyncHandler = require("express-async-handler");
const Rent = require("../models/rent.js");

const create = asyncHandler(async (req, res) => {
  const rent = await Rent.create(req.body);
  res.status(200).json({ message: "Rent Post Created", rent });
});

const get = asyncHandler(async (req, res) => {
  const _id = req.params._id;
  const rent = await Rent.findOne({ _id });
  res.status(200).json({ message: "Rent Post Obtained", rent });
});
const getAll = asyncHandler(async (req, res) => {
    const rents = await Rent.find();
    res.status(200).json({ message: "Rent Post Obtained", rents });
  });

const update = asyncHandler(async (req, res) => {
  const _id = req.params._id;
  const updatedRent = await Rent.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  res.status(200).json({ message: "Rent Post Updated", rent: updatedRent });
});

const remove = asyncHandler(async (req, res) => {
  const _id = req.params._id;
  const removedRent = await Rent.deleteOne({ _id });
  res.status(200).json({ message: "Rent Post Removed", rent: removedRent });
});

module.exports = { create, get,getAll, update, remove };
