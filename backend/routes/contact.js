const app=require("express")
const router=app.Router()

const { authenticate } = require("../middleware/auth.js");
const { get, getAll, update, remove } = require("../controllers/contact.js");

router.get("/contact", authenticate,get);
router.get("/contact", authenticate, getAll);
router.post("/contact",  authenticate,update);
router.delete("/contact", authenticate,remove);


module.exports = router;