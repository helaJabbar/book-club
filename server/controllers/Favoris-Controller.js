const Favorite = require('../models/Favoris-Model');


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
