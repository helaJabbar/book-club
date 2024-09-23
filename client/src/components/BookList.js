import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Form.css";
import "./Form-Card.css";

const BookList = () => {
  const [books, setBooks] = useState([]);

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

  return (
    <div className="book-list">
      <h1 >Liste des Livres</h1>
      <div className="cards-container">
        {books.map((book) => (
          <div key={book._id} className="card">
            <img
              src={`http://localhost:8000${book.imageUrl.replace(/\\/g, "/")}`}
              alt={book.title}
              className="card-image"
            />
            <div className="card-content">
              <h2>{book.title}</h2>
              <p>{book.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
