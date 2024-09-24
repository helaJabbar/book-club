import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Importer le contexte utilisateur
import "./Form.css";
import "./Form-Card.css";
import etoile from "../assets/favori.png";  // Import de l'image de l'étoile

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);  // État pour stocker les favoris
  const { user } = useContext(UserContext); // Vérifier si l'utilisateur est connecté
  const navigate = useNavigate(); // Utiliser navigate pour rediriger

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Récupérer tous les livres
        const response = await axios.get("http://localhost:8000/api/books");
        setBooks(response.data);

        // Si l'utilisateur est connecté, récupérer ses favoris
        if (user && user.userId) {
          const favoritesResponse = await axios.get(`http://localhost:8000/api/books/users/${user.userId}/favorites`);
          setFavorites(favoritesResponse.data.favorites);  // Stocker les favoris
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des livres ou des favoris:", error);
      }
    };

    fetchBooks();
  }, [user]);

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
            <div className="book-cover-container">
              <img
                src={`http://localhost:8000${book.imageUrl.replace(/\\/g, "/")}`}
                alt={book.title}
                className="card-image"
              />
              {/* Afficher l'étoile si le livre est un favori */}
              {favorites.includes(book._id) && (
                <img src={etoile} alt="Favori" className="favorite-star" />
              )}
            </div>
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
