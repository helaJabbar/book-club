import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./components/Login";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails"; 
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Accueil from "./components/Accueil";
import NewBook from "./components/NewBook";
import Register from "./components/Register";
import EditBook from "./components/EditBook"; 
import { UserProvider } from "./context/UserContext";

import 'bootstrap/dist/css/bootstrap.min.css';


/************CARROUSSEL************************** */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
  
          <Route path="/" element={<Accueil />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
