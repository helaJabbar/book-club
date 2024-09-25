import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./components/Login";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";  // Importation correcte de BookDetails
import NavBar from "./components/NavBar";
import NewBook from "./components/NewBook";
import Register from "./components/Register";
import EditBook from './components/EditBook';  // Ajout de l'importation pour la page EditBook
import { UserProvider } from './context/UserContext';  // Importation du contexte utilisateur
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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
      </Router>
    </UserProvider>
  );
}

export default App;
