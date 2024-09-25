import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Importer le contexte utilisateur
import "./Form.css";
import "./Form-Card.css";
import etoile from "../assets/favori.png"; // Import de l'image de l'étoile

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]); // État pour stocker les favoris
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // Stocke le terme de recherche
  const [filteredBooks, setFilteredBooks] = useState([]); // Livres filtrés

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Récupérer tous les livres
        const response = await axios.get("http://localhost:8000/api/books");
        setBooks(response.data);
        setFilteredBooks(response.data);
        // Si l'utilisateur est connecté, récupérer ses favoris
        if (user && user.userId) {
          const favoritesResponse = await axios.get(
            `http://localhost:8000/api/books/users/${user.userId}/favorites`
          );
          setFavorites(favoritesResponse.data.favorites); // Stocker les favoris
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des livres ou des favoris:",
          error
        );
      }
    };

    fetchBooks();
  }, [user]);

  // Fonction pour filtrer les livres en fonction du terme de recherche
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
        book.author.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleCardClick = (bookId) => {
    if (user && user.firstName) {
      navigate(`/books/${bookId}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="book-list">
      <h2 className="text-center book-club-title">Liste des Livres</h2>
      
      <div className="search-box">
        <form name="search">
          <input
            type="text"
            className="search-input"
            name="txt"
            placeholder="Rechercher un livre par titre ou auteur"
            value={searchTerm}
            onChange={handleSearch}
          />
        </form>
        <i className="fas fa-search search-icon"></i>
      </div>
  
      <div className="cards-container">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="card"
            onClick={() => handleCardClick(book._id)}
          >
            <div className="book-cover-container">
              <img
                src={`http://localhost:8000${book.imageUrl.replace(/\\/g, "/")}`}
                alt={book.title}
                className="card-image"
              />
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
