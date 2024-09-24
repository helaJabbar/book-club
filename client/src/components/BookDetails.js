import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Form.css";

const BookDetails = () => {
  const { id } = useParams(); // Récupère l'ID du livre depuis l'URL
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/books/${id}`
        );
        setBook(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du livre", error);
      }
    };

    fetchBook();
  }, [id]);

  const addToFavorites = async () => {
    try {
      await axios.post(`http://localhost:8000/api/users/add-favorite`, {
        bookId: id,
      });
      alert("Livre ajouté aux favoris avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout aux favoris", error);
    }
  };

  const deleteBook = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/books/${id}`);
      alert("Livre supprimé avec succès");
      navigate("/books"); // Redirige vers la liste des livres après suppression
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
      <img 
        src={`http://localhost:8000${book.imageUrl}`}
        alt={book.title}
        className="img-book-card"
      />

      <h2 className="book-title">{book.title}</h2>
      <p ><span className="form-span">Auteur</span> : {book.author}</p>
      <p><span className="form-span">Description</span>: {book.description}</p>
      

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
