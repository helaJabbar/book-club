const User = require('../models/User-Model');  
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validation des données du formulaire de connexion
  const errors = {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Email invalide";
  }
  if (!password) {
    errors.password = "Le mot de passe est requis";
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // Rechercher l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Comparer le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Retourner un message de succès et le token
    return res.status(200).json({ message: 'Vous êtes connecté', token });

  } catch (error) {
    console.error('Erreur serveur:', error);  // Afficher l'erreur dans la console
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};

module.exports = { loginUser };
