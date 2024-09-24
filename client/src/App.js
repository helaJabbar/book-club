import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./components/Login";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import NavBar from "./components/NavBar";
import NewBook from "./components/NewBook";
import Register from "./components/Register";
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
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/" element={<BookList />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
