const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Schéma de l'utilisateur
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Le prénom est obligatoire"],
      validate: {
        validator: (val) => /^[A-Za-zÀ-ÿ\s]+$/.test(val),
        message: "Le prénom ne doit contenir que des lettres et des espaces",
      },
      minlength: [2, "Le prénom doit contenir au moins 2 caractères"],
    },
    lastName: {
      type: String,
      required: [true, "Le nom est obligatoire"],
      validate: {
        validator: (val) => /^[A-Za-zÀ-ÿ\s]+$/.test(val),
        message: "Le nom ne doit contenir que des lettres et des espaces",
      },
      minlength: [2, "Le nom doit contenir au moins 2 caractères"],
    },
    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: true,
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Veuillez entrer un email valide",
      },
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est obligatoire"],
      minlength: [8, "Le mot de passe doit contenir au moins 8 caractères"],
    },
  },
  { timestamps: true }
);

// Propriété virtuelle pour `confirmPassword`
userSchema
  .virtual("confirmPassword")
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

userSchema.pre("validate", function (next) {
  console.log("Password:", this.password);
  console.log("Confirm Password:", this.confirmPassword);

  if (this.password !== this.confirmPassword) {
    this.invalidate(
      "confirmPassword",
      "Les mots de passe ne correspondent pas"
    );
  }
  next();
});

// Middleware pour hacher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Créer et exporter le modèle `User`
const User = mongoose.model("User", userSchema);
module.exports = User;
