const express = require("express");
const multer = require("multer");
const { check } = require("express-validator");

const {
  NewBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/NewBook-Controller");

const { registerUser } = require("../controllers/Register-Controller");
const { loginUser } = require("../controllers/Login-Controller");

const { addToFavorites, getFavorites, removeFromFavorites } = require("../controllers/Favoris-Controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/register", [
  check("firstName").notEmpty().withMessage("Le prénom est obligatoire"),
  check("lastName").notEmpty().withMessage("Le nom est obligatoire"),
  check("email").isEmail().withMessage("Veuillez entrer un email valide"),
  check("password").isLength({ min: 8 }).withMessage("Le mot de passe doit comporter au moins 8 caractères"),
], registerUser);

router.post("/login", loginUser);

// Routes CRUD pour la gestion des livres
router.post("/add-book", upload.single("image"), NewBook);
router.get("/books", getAllBooks);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);


// Routes pour la gestion des favoris
router.post("/users/:userId/add-favorite", addToFavorites);
router.post("/users/:userId/remove-favorite", removeFromFavorites);
router.get("/users/:userId/favorites", getFavorites);

router.get("/", getAllBooks);
router.get("/:id", getBookById);

module.exports = router;
