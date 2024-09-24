const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schéma pour les favoris
const favoriteSchema = new Schema({
  userId: { type: String, required: true },  // L'ID de l'utilisateur
  bookIds: [{ type: String }]  // Liste des IDs des livres favoris
});

// Modèle pour les favoris
const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
