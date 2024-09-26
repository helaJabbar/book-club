import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import "./Form.css";

const NewBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    image: null,
  });

  const { user } = useContext(UserContext);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setBook({ ...book, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setBook({ ...book, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("description", book.description);
    formData.append("image", book.image);
    formData.append("userId", user.userId);
  
    console.log([...formData.entries()]);  // Ajouté pour voir les données envoyées
  
    try {
      const response = await axios.post(
        "http://localhost:8000/api/books/add-book",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Livre ajouté avec succès");
  
      setBook({
        title: "",
        author: "",
        description: "",
        image: null,
      });
      setImagePreview(null);
      fileInputRef.current.value = "";
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Erreur lors de l'ajout du livre:", error);
      }
    }
  };
  

  return (
    <div className="container">
      <div className="row justify-content-center my-5">
        <div className="col-md-6">
          <h2 className="text-center book-club-title">Ajouter un Livre</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group my-4">
              <label htmlFor="title" className="form-label">Titre</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={book.title}
                onChange={handleChange}
                placeholder="Entrer le titre du livre"
                required
              />
              {errors.title && <div className="text-danger">{errors.title}</div>} {/* Afficher les erreurs du titre */}
            </div>

            <div className="form-group my-4">
              <label htmlFor="author" className="form-label">Auteur</label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={book.author}
                onChange={handleChange}
                placeholder="Entrer le nom de l'auteur"
                required
              />
              {errors.author && <div className="text-danger">{errors.author}</div>} {/* Afficher les erreurs de l'auteur */}
            </div>

            <div className="form-group my-4">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={book.description}
                onChange={handleChange}
                placeholder="Entrer la description"
                required
              />
              {errors.description && <div className="text-danger">{errors.description}</div>} {/* Afficher les erreurs de la description */}
            </div>

            <div className="form-group my-4">
              <label htmlFor="image" className="form-label">Télécharger une image</label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                ref={fileInputRef}
                onChange={handleChange}
                required
              />
              {errors.image && <div className="text-danger">{errors.image}</div>} {/* Afficher les erreurs de l'image */}
            </div>

            {imagePreview && (
              <div className="my-4">
                <img src={imagePreview} alt="Aperçu" id="img-uploaded" />
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100">Ajouter Livre</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBook;
