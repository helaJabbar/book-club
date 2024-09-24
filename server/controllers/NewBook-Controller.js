const Book = require('../models/NewBook-Model');


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
      imageUrl, 
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création du livre", error: err });
  }
};
