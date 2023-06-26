const app=require("express")
const router=app.Router()

const { authenticate } = require("../middleware/auth.js");
const { get, getAll, create, remove } = require("../controllers/contact.js");

router.get("/:_id", authenticate,get);
router.get("/", authenticate, getAll);
router.post("/",create);
router.delete("/:_id", authenticate,remove);


module.exports = router;