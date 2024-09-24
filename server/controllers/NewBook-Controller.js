const Book = require('../models/NewBook-Model'); // Assurez-vous que le modèle est bien importé

// Créer un nouveau livre (Create)
exports.NewBook = async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !author || !description || !imageUrl) {
      return res.status(400).json({ message: "Tous les champs sont requis, y compris l'image" });
    }

    const newBook = new Book({
      title,
      author,
      description,
      imageUrl, // Enregistrer l'URL de l'image
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création du livre", error: err });
  }
};

// Récupérer la liste de tous les livres (Read - pour BookList.js)
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find(); // Récupérer tous les livres
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des livres", error: err });
  }
};

// Récupérer un livre par ID (Read - pour BookDetails.js)
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération du livre", error: err });
  }
};

// Mettre à jour un livre (Update - pour EditBook.js)
exports.updateBook = async (req, res) => {
  try {
    const { title, author, description } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, description },
      { new: true, runValidators: true }  
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }

    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du livre", error: err });
  }
};


// Supprimer un livre (Delete)
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    res.json({ message: "Livre supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression du livre", error: err });
  }
};
