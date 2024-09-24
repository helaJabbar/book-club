import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; 
import "./Form.css";
import etoile from "../assets/favori.png";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); 
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/books/${id}`
        );
        setBook(response.data);

        
        if (user && user.userId) {
          const favoriteResponse = await axios.get(
            `http://localhost:8000/api/books/users/${user.userId}/favorites`
          );
          if (favoriteResponse.data.favorites.includes(id)) {
            setIsFavorite(true);
          }
        } else {
          console.error("ID utilisateur non défini");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du livre", error);
      }
    };

    if (user.userId) {
      fetchBook(); 
    }
  }, [id, user]);

  const addToFavorites = async () => {
    try {
      console.log("ID utilisateur :", user.userId); 

      if (!user.userId) {
        // Si l'ID utilisateur est undefined, renvoie une erreur
        throw new Error("Utilisateur non connecté");
      }

      await axios.post(
        `http://localhost:8000/api/books/users/${user.userId}/add-favorite`,
        {
          bookId: id,
        }
      );
      setIsFavorite(true); 
      alert("Livre ajouté aux favoris avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout aux favoris", error);
    }
  };

  const deleteBook = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/books/${id}`);
      alert("Livre supprimé avec succès");
      navigate("/books");
    } catch (error) {
      console.error("Erreur lors de la suppression du livre", error);
    }
  };

  const editBook = () => {
    navigate(`/edit-book/${id}`); 
  };

  if (!book) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="book-card">
      <div className="book-cover-container">
        <img
          src={`http://localhost:8000${book.imageUrl}`}
          alt={book.title}
          className="img-book-card"
        />
        {isFavorite && (
          <img src={etoile} alt="Favori" className="favorite-star" /> 
        )}
        <h2 className="book-title">{book.title}</h2>
        <p>
          <span className="form-span">Auteur</span> : {book.author}
        </p>
        <p>
          <span className="form-span">Description</span> : {book.description}
        </p>
      </div>
      {/* Les actions (boutons) sont séparées du texte */}
      <div className="actions">
        <button className="btn btn-primary w-100" onClick={addToFavorites}>
          Ajouter aux favoris
        </button>
        <button className="btn btn-primary w-100" onClick={deleteBook}>
          Supprimer
        </button>
        <button className="btn btn-primary w-100" onClick={editBook}>
          Modifier
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
