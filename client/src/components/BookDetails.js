import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Import du contexte utilisateur
import "./Form.css";
import etoile from "../assets/favori.png"; // Import de l'image de l'étoile

const BookDetails = () => {
  const { id } = useParams(); // Récupère l'ID du livre depuis l'URL
  const [book, setBook] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // État pour gérer le favori
  const { user } = useContext(UserContext); // Utilisation du contexte utilisateur pour obtenir userId
  const navigate = useNavigate(); // Pour rediriger après suppression ou modification

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/books/${id}`
        );
        setBook(response.data);

        // Attendre que userId soit défini avant de faire l'appel
        if (user && user.userId) {
          const favoriteResponse = await axios.get(
            `http://localhost:8000/api/books/users/${user.userId}/favorites`
          );
          if (favoriteResponse.data.favorites.includes(id)) {
            setIsFavorite(true); // Le livre est déjà favori
          }
        } else {
          console.error("ID utilisateur non défini");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du livre", error);
      }
    };

    if (user.userId) {
      fetchBook(); // Appeler fetchBook uniquement lorsque userId est disponible
    }
  }, [id, user]);

  const addToFavorites = async () => {
    try {
      console.log("ID utilisateur :", user.userId); // Vérifie que l'ID est bien défini

      if (!user.userId) {
        // Si l'ID utilisateur est undefined, renvoie une erreur
        throw new Error("Utilisateur non connecté");
      }

      await axios.post(
        `http://localhost:8000/api/books/users/${user.userId}/add-favorite`,
        {
          bookId: id, // ID du livre actuel
        }
      );
      setIsFavorite(true); // Met à jour l'état pour afficher l'étoile
      alert("Livre ajouté aux favoris avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout aux favoris", error);
    }
  };

  const deleteBook = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/books/${id}`);
      alert("Livre supprimé avec succès");
      navigate("/books"); // Rediriger vers la liste des livres après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression du livre", error);
    }
  };

  const editBook = () => {
    navigate(`/edit-book/${id}`); // Rediriger vers la page d'édition du livre
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
          <img src={etoile} alt="Favori" className="favorite-star" /> // Affiche l'étoile si le livre est un favori
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
