const asyncHandler = require("express-async-handler");
const User = require("../models/contact.js");

const get = asyncHandler(async (req, res) => {
    const _id = req.params._id;
    const contact = await contact.findOne({ _id });
    res.status(200).json({ message: "Successfully Obtained Contact", contact });
  });

const getAll = asyncHandler(async (req, res) => {
  const contacts = await contact.find();
  res.status(200).json({ message: "Successfully Obtained Contacts", contacts });
});


const update = asyncHandler(async (req, res) => {
  const _id = req.params._id;
  const updatedcontact = await contact.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  res.status(200).json({ message: "Contact Updateed", contact: updatedcontact });
});


const remove = asyncHandler(async (req, res) => {
  const _id = req.params._id;
  const removedcontact = await contact.deleteOne({ _id });
  res.status(200).json({ message: "Contact Removed", contact: removedcontact });
});
