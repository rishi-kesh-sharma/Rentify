const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact.js");

const get = asyncHandler(async (req, res) => {
  const _id = req.params._id;
  const contact = await Contact.findOne({ _id });
  res.status(200).json({ message: "Successfully Obtained Contact", contact });
});

const getAll = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json({ message: "Successfully Obtained Contacts", contacts });
});

const create = asyncHandler(async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(200).json({ message: "Contact Updateed", contact });
});

const remove = asyncHandler(async (req, res) => {
  const _id = req.params._id;
  const removedcontact = await Contact.deleteOne({ _id });
  res.status(200).json({ message: "Contact Removed", contact: removedcontact });
});

module.exports = { get, getAll, create, remove };
