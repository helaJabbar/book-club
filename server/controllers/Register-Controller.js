const User = require('../models/User-Model');

// Fonction pour enregistrer un nouvel utilisateur
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Utilisateur enregistré avec succès" });
  } catch (err) {
    // Si c'est une ValidationError, on extrait les messages d'erreurs par champ
    if (err.name === 'ValidationError') {
      const errorMessages = extractFieldErrors(err);
      return res.status(400).json({ message: "Erreur de validation", errors: errorMessages });
    }

    // Gérer d'autres types d'erreurs
    console.error("Erreur lors de l'enregistrement de l'utilisateur:", err);
    res.status(500).json({ message: "Erreur du serveur", error: err.message });
  }
};


const extractFieldErrors = (err) => {
  if (err.name !== 'ValidationError') return {};


  return Object.keys(err.errors).reduce((errors, field) => {
    errors[field] = err.errors[field].message;
    return errors;
  }, {});
};
