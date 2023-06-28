const app = require("express");
const router = app.Router();

const { authenticate } = require("../middleware/auth.js");

const {
  create,
  get,
  getAll,
  update,
  remove,
} = require("../controllers/rent.js");

router.post("/", authenticate, create);
router.get("/:_id", get);
router.get("/", getAll);
router.put("/:_id", authenticate, update);
router.delete("/:_id", authenticate, remove);

module.exports = router;
