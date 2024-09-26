import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Modal, Button } from "react-bootstrap";

import "./Form.css";
import "./Modal.css";

import etoile from "../assets/favori.png";
import prefere from "../assets/prefere.png";
import dislike from "../assets/dislike.png";
import supp from "../assets/delete.png";

const BookDetails = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteImage, setFavoriteImage] = useState(prefere);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

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
            setFavoriteImage(dislike);
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

  const toggleFavorite = async () => {
    try {
      if (!user.userId) {
        throw new Error("Utilisateur non connecté");
      }

      if (isFavorite) {
        await axios.post(
          `http://localhost:8000/api/books/users/${user.userId}/remove-favorite`,
          
          { bookId: id }
        );
        setIsFavorite(false);
        setFavoriteImage(prefere);
        alert("Livre retiré des favoris");
      } else {
        await axios.post(
          `http://localhost:8000/api/books/users/${user.userId}/add-favorite`,
          { bookId: id }
        );
        setIsFavorite(true);
        setFavoriteImage(dislike);
        alert("Livre ajouté aux favoris");
      }
    } catch (error) {
      console.error("Erreur lors de la modification des favoris", error);
    }
  };

  const deleteBook = async () => {
    try {

      await axios.delete(`http://localhost:8000/api/books/delete/${id}`, {
        data: { userId: user.userId },
      });
      alert("Livre supprimé avec succès");
      navigate("/books");
    } catch (error) {
      console.error("Erreur lors de la suppression du livre", error);
      alert("Vous n'êtes pas autorisé à supprimer ce livre.");
    }
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    setShowModal(false);
    deleteBook();
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
      <div className="actions">
        <img
          src={favoriteImage}
          alt={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          className="prefere-button"
          onClick={toggleFavorite}
          style={{ cursor: "pointer", width: "50px", height: "50px" }}
        />

        {user.userId === book.userId._id && (
          <>
            <button
              className="btn btn-primary w-100"
              onClick={handleDeleteClick}
            >
              Supprimer
            </button>
            <button className="btn btn-primary w-100" onClick={editBook}>
              Modifier
            </button>
          </>
        )}
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>Êtes-vous sûr de vouloir supprimer ce livre ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            <img
              src={supp}
              alt="Supprimer"
              style={{ width: "20px", height: "20px", marginRight: "8px" }}
            />
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BookDetails;
