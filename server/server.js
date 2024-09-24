const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
require("dotenv").config();
require("./config/mongoose.config");

const bookRoutes = require("./routes/routes");

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors()); 
app.use('/uploads', express.static('uploads'));  

app.use('/api/books', bookRoutes);

// Démarrage du serveur
app.listen(port, () => console.log(`Listening on port: ${port}`));
