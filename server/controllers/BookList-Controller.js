const Book = require("../models/BookList-Model");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();  // Récupérer tous les livres
    res.status(200).json(books);      // Envoyer la liste des livres en réponse
  } catch (error) {
    console.error("Erreur lors de la récupération des livres:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
