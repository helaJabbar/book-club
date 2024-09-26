const Book = require("../models/NewBook-Model");
const User = require("../models/User-Model");

// Fonction pour créer un nouveau livre
exports.NewBook = async (req, res) => {
  try {
    const { title, author, description, userId } = req.body; // Récupérer userId depuis req.body
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !author || !description || !userId) {
      return res.status(400).json({ errors: ["Tous les champs sont requis"] });
    }

    if (!imageUrl) {
      return res.status(400).json({ errors: ["L'image est obligatoire"] });
    }

    const newBook = new Book({
      title,
      author,
      description,
      imageUrl,
      userId,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error("Erreur lors de la création du livre:", err);

    if (err.name === "ValidationError") {
      const errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ errors });
    }

    res
      .status(500)
      .json({
        message: "Erreur lors de la création du livre",
        error: err.message,
      });
  }
};

// Fonction pour récupérer un livre par ID
exports.getBookById = async (req, res) => {
  try {
    // Utilisez populate pour peupler le userId avec les détails de l'utilisateur
    const book = await Book.findById(req.params.id).populate(
      "userId",
      "firstName lastName _id"
    );

    console.log("Détails du livre avec userId :", book);
    
    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }

    console.log("Détails du livre avec userId peuplé :", book); // Vérifiez si userId est peuplé
    res.status(200).json(book);
  } catch (err) {
    console.error("Erreur lors de la récupération du livre :", err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du livre" });
  }
};

// Fonction pour mettre à jour un livre
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;  // Récupérer l'ID du livre à partir des paramètres
    const { title, author, description } = req.body;  // Récupérer les données envoyées

    // Utilisation de findByIdAndUpdate avec validation
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, description },
      { new: true, runValidators: true } // Validation activée lors de la mise à jour
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }

    res.status(200).json(updatedBook);
  } catch (err) {
    console.error("Erreur lors de la mise à jour du livre :", err);

    // Si une erreur de validation est détectée, Mongoose renvoie une ValidationError
    if (err.name === "ValidationError") {
      // Créer un objet pour renvoyer les messages d'erreurs spécifiques à chaque champ
      const errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ errors }); // Renvoie les erreurs au frontend
    }

    // Gérer les autres erreurs
    res.status(500).json({ message: "Erreur lors de la mise à jour du livre", error: err.message });
  }
};


// Fonction pour supprimer un livre
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    res.json({ message: "Livre supprimé avec succès" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du livre", error: err });
  }
};

// Fonction pour retourner tous les livres
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find(); // Récupère tous les livres de la base de données
    res.status(200).json(books);
  } catch (err) {
    console.error("Erreur lors de la récupération des livres:", err);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la récupération des livres" });
  }
};
