import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import "./Form.css";
import "./Form-Card.css"
const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/books/${id}`, book);
      navigate("/books"); // Redirige vers la liste des livres après la modification
    } catch (error) {
      console.error("Erreur lors de la modification du livre", error);
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
        </div>
        <div className="form-group ">
          <label className="form-label">Auteur</label>
          <input
            type="text"
            name="author"
            className="form-control"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default EditBook;
