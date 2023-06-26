const express = require("express");
const router = express.Router();
const {
  update,
  getSingle,
  remove,
  getAll,
  getProfile,
  updateProfile,
  removeProfile,
} = require("../controllers/user.js");

// profile related
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.delete("/profile", removeProfile);

router.get("/", getAll);
router.get("/:_id", getSingle);
router.put("/:_id", update);
router.delete("/:_id", remove);

module.exports = router;
