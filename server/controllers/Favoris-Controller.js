const Favorite = require('../models/Favoris-Model');

// Ajouter un livre aux favoris
exports.addToFavorites = async (req, res) => {
  const { userId } = req.params;  // Récupère l'ID de l'utilisateur depuis l'URL
  const { bookId } = req.body;  // Récupère l'ID du livre depuis le corps de la requête

  try {
    let userFavorites = await Favorite.findOne({ userId });

    if (!userFavorites) {
      // Si l'utilisateur n'a pas encore de favoris, on crée un nouveau document
      userFavorites = new Favorite({ userId, bookIds: [bookId] });
    } else {
      // Si l'utilisateur a déjà des favoris, on ajoute l'ID du livre s'il n'est pas déjà présent
      if (!userFavorites.bookIds.includes(bookId)) {
        userFavorites.bookIds.push(bookId);
      }
    }

    await userFavorites.save();
    res.status(200).send({ message: 'Livre ajouté aux favoris.' });
  } catch (error) {
    res.status(500).send({ message: "Erreur lors de l'ajout aux favoris.", error });
  }
};

// Récupérer les livres favoris d'un utilisateur
exports.getFavorites = async (req, res) => {
  const { userId } = req.params;  // Récupère l'ID de l'utilisateur depuis l'URL

  try {
    const userFavorites = await Favorite.findOne({ userId });

    if (!userFavorites) {
      return res.status(200).send({ favorites: [] });
    }

    res.status(200).send({ favorites: userFavorites.bookIds });
  } catch (error) {
    res.status(500).send({ message: "Erreur lors de la récupération des favoris.", error });
  }
};
const addToFavorites = async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.body;

  try {
    let userFavorites = await Favorite.findOne({ userId });

    if (!userFavorites) {
      userFavorites = new Favorite({ userId, bookIds: [bookId] });
    } else {
      if (!userFavorites.bookIds.includes(bookId)) {
        userFavorites.bookIds.push(bookId);
      }
    }

    await userFavorites.save();
    res.status(200).send({ message: 'Livre ajouté aux favoris' });
  } catch (error) {
    res.status(500).send({ message: 'Erreur lors de l\'ajout aux favoris', error });
  }
};
