const Book =require('../models/NewBook-Model');

const NewBook = async (req, res) => {
  const { title, description } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;
  
  try {
    const newBook = await Book.create({
      title,
      description,
      imageUrl
    });
    return res.status(201).json({ message: "Livre ajouté avec succès", book: newBook });
  } catch (error) {
    return res.status(400).json({ message: "Erreur lors de l'ajout du livre", error });
  }
};

module.exports = { NewBook };
