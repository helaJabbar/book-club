const express = require("express");
const { NewBook } = require("../controllers/NewBook-Controller");
const { registerUser } = require("../controllers/Register-Controller");
const { getAllBooks } = require("../controllers/BookList-Controller");
const { check } = require("express-validator");
const multer = require("multer");

// Configuration de multer pour les fichiers image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Assurez-vous que ce dossier existe
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

// Route pour ajouter un livre
router.post("/add-book", upload.single("image"), NewBook);

// Route pour l'inscription des utilisateurs
router.post(
  "/register",
  [
    check("firstName").notEmpty().withMessage("Le prénom est obligatoire"),
    check("lastName").notEmpty().withMessage("Le nom est obligatoire"),
    check("email").isEmail().withMessage("Veuillez entrer un email valide"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Le mot de passe doit comporter au moins 8 caractères"),
  ],
  registerUser
);

router.post("/add-book", upload.single("image"), NewBook);
router.get("/", getAllBooks);
module.exports = router;
