const multer = require("multer");

//Sécurise et contrôle les fichiers téléchargés en s'assurant qu'ils sont bien des images avec les extensions attendues
const MiNE_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

//Configuration de stockage pour Multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split("").join("_");
    const extension = MiNE_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
