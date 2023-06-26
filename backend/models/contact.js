const mongoose = require("mongoose");
const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      reqired: true,
    },
    email: {
      type: String,
      reqired: true,
    },
    subject: {
      type: String,
      reqired: true,
    },
    body: {
      type: String,
      reqired: true,
    },
  },
  {
    timestamps: true,
  }
);
const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
