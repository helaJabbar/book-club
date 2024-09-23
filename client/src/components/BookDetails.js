import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams(); // Récupère l'id du livre à partir de l'URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du livre :", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) return <div>Chargement...</div>;

  return (
    <div className="book-details">
      <h1>{book.title}</h1>
      <img
        src={`http://localhost:8000/${book.imageUrl.replace(/\\/g, "/")}`}
        alt={book.title}
        className="book-image"
      />
      <p>{book.description}</p>
    </div>
  );
};

export default BookDetails;
