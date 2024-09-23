const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const nameValidation = /^[A-Za-zÀ-ÿ\s]+$/;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, // Prénom obligatoire
    match: nameValidation,
  },
  lastName: {
    type: String,
    required: true, // Nom de famille obligatoire
    match: nameValidation,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Assure que l'email est unique
    match: /.+\@.+\..+/ // Validation de format d'email
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Longueur minimale
  },
}, { timestamps: true });

// Middleware pour hacher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
