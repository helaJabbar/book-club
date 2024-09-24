const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schéma de l'utilisateur
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Hasher le mot de passe avant de sauvegarder l'utilisateur
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Comparer le mot de passe lors de la connexion
UserSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Vérifie si le modèle 'User' existe déjà, sinon crée-le
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
