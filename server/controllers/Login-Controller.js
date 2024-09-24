const User = require('../models/User-Model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Retourne l'ID utilisateur avec le prénom et le nom
    return res.status(200).json({
      message: 'Vous êtes connecté',
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        userId: user._id  
      }
    });
  } catch (error) {
    console.error('Erreur serveur:', error);
    return res.status(500).json({ message: 'Erreur serveur', error });
  }
};

module.exports = { loginUser };
