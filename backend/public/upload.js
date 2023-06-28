const express = require("express");
const multer = require("multer");
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, next) {
    next(null, "./profileUploads");
  },
  filename: function (req, file, next) {
    next(null, Date.now() + file.fieldname);
  },
});

app.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    console.log("No file Uploaded");
    return res.send({
      success: false,
    });
  } else {
    console.log("File Uploaded");
    return res.send({
      success: true,
    });
  }
});

const upload = multer({ storage });
module.exports = upload
