const Favorite = require('../models/Favoris-Model');

// Ajouter un livre aux favoris
exports.addToFavorites = async (req, res) => {
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
    res.status(200).send({ message: 'Livre ajouté aux favoris.' });
  } catch (error) {
    res.status(500).send({ message: "Erreur lors de l'ajout aux favoris.", error });
  }
};

// Récupérer la liste des favoris
exports.getFavorites = async (req, res) => {
  const { userId } = req.params;

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

// Retirer un livre des favoris
exports.removeFromFavorites = async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.body;

  try {
    let userFavorites = await Favorite.findOne({ userId });

    if (!userFavorites) {
      return res.status(404).send({ message: "Aucun favori trouvé pour cet utilisateur." });
    }

    // Supprimer le bookId de la liste des favoris
    userFavorites.bookIds = userFavorites.bookIds.filter(id => id !== bookId);

    await userFavorites.save();
    res.status(200).send({ message: "Livre retiré des favoris." });
  } catch (error) {
    res.status(500).send({ message: "Erreur lors de la suppression des favoris.", error });
  }
};
