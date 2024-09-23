const bcrypt = require('bcrypt');
const User = require('../models/Register-Model'); // Chemin d'accès au modèle utilisateur
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {
  // Validation des erreurs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;

  try {
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'L\'utilisateur existe déjà' });
    }

    // Créer un nouvel utilisateur
    user = new User({
      firstName,
      lastName,
      email,
      password
    });

    
    await user.save();

    res.status(201).json({ msg: 'Utilisateur créé avec succès' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erreur du serveur');
  }
};
