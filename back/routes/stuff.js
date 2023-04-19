const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')


const stuffCtrl = require("../controllers/user");

// router.get("/signup", userCtrl.signup);
router.post("/", auth, multer, stuffCtrl.createThing);

module.exports = router;
