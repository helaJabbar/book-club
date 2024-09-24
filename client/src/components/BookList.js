import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Importer le contexte utilisateur
import "./Form.css";
import "./Form-Card.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const { user } = useContext(UserContext); // Vérifier si l'utilisateur est connecté
  const navigate = useNavigate(); // Utiliser navigate pour rediriger

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des livres:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleCardClick = (bookId) => {
    if (user && user.firstName) {
      navigate(`/books/${bookId}`); // Rediriger vers CardDetails si l'utilisateur est connecté
    } else {
      navigate('/login'); // Rediriger vers la page de login si l'utilisateur n'est pas connecté
    }
  };

  return (
    <div className="book-list">
      <h1>Liste des Livres</h1>
      <div className="cards-container">
        {books.map((book) => (
          <div key={book._id} className="card" onClick={() => handleCardClick(book._id)}>
            <img
              src={`http://localhost:8000${book.imageUrl.replace(/\\/g, "/")}`}
              alt={book.title}
              className="card-image"
            />
            <div className="card-content">
              <h2>{book.title}</h2>
              <p>{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
