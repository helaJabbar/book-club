const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Le titre est obligatoire"],
    validate: {
      validator: function (value) {
        return value && value.trim().length > 0; // Vérifier que le titre n'est pas vide
      },
      message: "Le titre ne peut pas être vide"
    }
  },
  author: {
    type: String,
    required: [true, "L'auteur est obligatoire"],
    validate: {
      validator: function (value) {
        return /^[a-zA-Z\s]+$/.test(value); // L'auteur doit contenir uniquement des lettres et des espaces
      },
      message: "L'auteur ne doit contenir que des lettres et des espaces."
    }
  },
  description: {
    type: String,
    required: [true, "La description est obligatoire"],
    validate: {
      validator: function (value) {
        return value && value.length >= 5; // Vérifier que la description a au moins 5 caractères
      },
      message: "La description doit comporter au moins 5 caractères"
    }
  },
  imageUrl: {
    type: String,
    required: [true, "L'image est obligatoire"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, 
  },
});

module.exports = mongoose.model('Book', BookSchema);
