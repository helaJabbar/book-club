const User = require('../models/User-Model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Expression régulière pour valider le format de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Vérifier que les champs ne sont pas vides
  if (!email || !password) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires" });
  }

  // Vérifier si le format de l'email est correct
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Email incorrect" });
  }

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier si le mot de passe est correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // Générer un token JWT si l'utilisateur est authentifié avec succès
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      message: "Vous êtes connecté",
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        userId: user._id
      }
    });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return res.status(500).json({ message: "Erreur serveur", error });
  }
};

module.exports = { loginUser };
