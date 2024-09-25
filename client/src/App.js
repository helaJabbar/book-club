import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./components/Login";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";  // Importation correcte de BookDetails
import NavBar from "./components/NavBar";
import Footer from './components/Footer'; 

import NewBook from "./components/NewBook";
import Register from "./components/Register";
import EditBook from './components/EditBook';  // Ajout de l'importation pour la page EditBook
import { UserProvider } from './context/UserContext';  // Importation du contexte utilisateur



function App() {
  return (
    <UserProvider>
      <Router>
        <NavBar />
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/NewBook" element={<NewBook />} />
          <Route path="/books/:id" element={<BookDetails />} />  {/* Utilisation de BookDetails pour afficher les détails du livre */}
          <Route path="/edit-book/:id" element={<EditBook />} />  {/* Route pour la page de modification */}
          <Route path="/" element={<BookList />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
