import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import "./Form.css"; // CSS pour le formulaire
import "./Form-Card.css"; // CSS pour la carte du formulaire

const EditBook = () => {
  const { id } = useParams(); // Récupère l'ID du livre à modifier
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
  });

  const [errors, setErrors] = useState({}); // État pour gérer les erreurs de validation

  // Fonction pour récupérer les détails du livre
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/books/${id}`
        );
        setBook(response.data); // Met à jour l'état avec les données du livre
      } catch (error) {
        console.error("Erreur lors de la récupération du livre", error);
      }
    };
    fetchBook();
  }, [id]);

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  // Fonction pour soumettre le formulaire de modification
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut
    try {
      const updatedBook = {
        title: book.title,
        author: book.author,
        description: book.description,
      };

      await axios.put(
        `http://localhost:8000/api/books/update/${id}`,
        updatedBook
      );
      navigate("/books"); // Redirige vers la liste des livres après la modification
    } catch (error) {
      // Si Axios reçoit une erreur de validation du backend
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors); // Stocke les erreurs de validation dans l'état
      } else {
        console.error("Erreur lors de la modification du livre", error);
      }
    }
  };

  return (
    <div className="edit-book-card">
      <h2 className="text-center book-club-title">Modifier le livre</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label className="form-label">Titre</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={book.title}
            onChange={handleChange}
            required
          />
          
          {errors.title && <div className="text-danger">{errors.title}</div>}
        </div>

        {/* Champ Auteur */}
        <div className="form-group">
          <label className="form-label">Auteur</label>
          <input
            type="text"
            name="author"
            className="form-control"
            value={book.author}
            onChange={handleChange}
            required
          />
          {/* Affiche le message d'erreur pour le champ "author" */}
          {errors.author && (
            <div className="text-danger">{errors.author}</div>
          )}
        </div>

        {/* Champ Description */}
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={book.description}
            onChange={handleChange}
            required
          ></textarea>
          
          {errors.description && (
            <div className="text-danger">{errors.description}</div>
          )}
        </div>

        {/* Bouton de soumission */}
        <button type="submit" className="btn btn-primary w-100">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default EditBook;
