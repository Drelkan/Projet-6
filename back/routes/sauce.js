const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const sauceCtrl = require("../controllers/sauce");
const { createSauce } = require("../controllers/sauce");

router.get("/", auth, sauceCtrl.getAllSauces);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);

//Teste modification produit
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
//

//teste compteur like
// router.post("/:id/like", auth, (req, res) => {
//   const sauceId = req.params.id;
//   const usserId = req.body.userId;
//   const like = req.body.like;
//   res.status(200).json({ message: "like modifié" + sauceId });
// });
//
router.post("/:id/like", auth, sauceCtrl.likeSauce)


//test supprssion
router.delete("/:id", auth, sauceCtrl.deleteSauce);

module.exports = router;
