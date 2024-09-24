const express = require("express");
const {
  NewBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/NewBook-Controller");  // Import des fonctions CRUD
const { registerUser } = require("../controllers/Register-Controller");
const { loginUser } = require("../controllers/Login-Controller");
const { addToFavorites, getFavorites } = require("../controllers/Favoris-Controller");  // Import des fonctions favoris
const { check } = require("express-validator");
const multer = require("multer");

// Configuration de multer pour les fichiers image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");  // Assurez-vous que ce dossier existe
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
const router = express.Router();

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

// Route pour la connexion des utilisateurs
router.post("/login", loginUser);

// Route pour ajouter un nouveau livre (Create)
router.post("/add-book", upload.single("image"), NewBook);

// Route pour récupérer tous les livres (Read - BookList.js)
router.get("/books", getAllBooks);

// Route pour récupérer un livre par ID (Read - BookDetails.js)
router.get("/books/:id", getBookById);

// Route pour mettre à jour un livre (Update - EditBook.js)
router.put("/:id", updateBook);

// Route pour supprimer un livre (Delete)
router.delete("/:id", deleteBook);

// Route pour ajouter un livre aux favoris de l'utilisateur
router.post("/users/:userId/add-favorite", addToFavorites);


// Route pour récupérer les livres favoris de l'utilisateur
router.get("/users/:userId/favorites", getFavorites);


router.get("/", getAllBooks);  // Récupérer tous les livres
router.get("/:id", getBookById);  // Route pour récupérer un livre par son ID


module.exports = router;
