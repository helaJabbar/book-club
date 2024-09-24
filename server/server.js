const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
require("dotenv").config();
require("./config/mongoose.config");

// Importation des routes
const bookRoutes = require("./routes/routes");

app.use(express.json());  // Middleware pour parser les données JSON
app.use(express.urlencoded({ extended: true }));  // Middleware pour parser les données URL-encoded
app.use(cors());  // Middleware pour autoriser les requêtes CORS
app.use('/uploads', express.static('uploads'));  // Servir les fichiers uploadés (images)

// Utilisation des routes avec le préfixe /api
app.use('/api/books', bookRoutes);  // Toutes les routes définies dans routes.js (y compris /login, /register, etc.)

// Démarrage du serveur
app.listen(port, () => console.log(`Listening on port: ${port}`));
