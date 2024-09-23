import React, { useState, useRef } from "react";
import axios from "axios";
import "./Form.css";

const NewBook = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null); // Référence pour le champ de fichier

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setBook({ ...book, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setBook({ ...book, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("description", book.description);
    formData.append("image", book.image);

    try {
        await axios.post("http://localhost:8000/api/books/add-book", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Livre ajouté avec succès");

        setBook({
            title: "",
            description: "",
            image: null,
        });
        setImagePreview(null);
        fileInputRef.current.value = ""; 
    } catch (error) {
        console.error("Erreur lors de l'ajout du livre", error);
    }
};



  return (
    <div className="container">
      <div className="row justify-content-center my-5">
        <div className="col-md-6">
          <h2 className="text-center book-club-title">Ajouter un Livre</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group my-4">
              <label htmlFor="title" className="form-label">
                Titre
              </label>
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
            </div>

            <div className="form-group my-4">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={book.description}
                onChange={handleChange}
                placeholder="Entrer la description"
                required
              />
            </div>

            <div className="form-group my-4">
              <label htmlFor="image" className="form-label">
                Télécharger une image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                ref={fileInputRef} // Ajoute la référence ici
                onChange={handleChange}
                required
              />
            </div>

            {imagePreview && (
              <div className="my-4">
                <img src={imagePreview} alt="Aperçu" id="img-uploaded" />
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100">
              Ajouter Livre
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBook;
