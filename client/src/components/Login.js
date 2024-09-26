import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./Form.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { handleLogin, user } = useContext(UserContext);

  // Fonction de soumission du formulaire de connexion
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/books/login", {
        email,
        password,
      });

      setMessage(response.data.message);

      // Stocker l'utilisateur dans le localStorage après connexion
      handleLogin(response.data.user.firstName, response.data.user.lastName, response.data.user.userId);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Stocker les données utilisateur

      // Redirige l'utilisateur après une brève pause pour afficher le message de succès
      setTimeout(() => {
        navigate("/");
      }, 2000); // Délai de 2 secondes avant redirection

    } catch (err) {
      setMessage("");
      if (err.response && err.response.data.message) {
        const fieldErrors = {};

        if (err.response.data.message.includes("Email incorrect")) {
          fieldErrors.email = "Email incorrect";
        }
        if (err.response.data.message.includes("Utilisateur non trouvé")) {
          fieldErrors.email = "Utilisateur non trouvé";
        }
        if (err.response.data.message.includes("Mot de passe incorrect")) {
          fieldErrors.password = "Mot de passe incorrect";
        }

        setErrors(fieldErrors); // Affiche les erreurs sous les champs
      } else {
        setErrors({ general: "Erreur lors de la connexion. Veuillez vérifier vos informations." });
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center my-5">
        <div className="col-md-6">
          <h2 className="text-center book-club-title">Login</h2>

          {/* Message de succès ou d'erreur générale */}
          {message && <div className="alert alert-success">{message}</div>}
          {errors.general && <div className="alert alert-danger">{errors.general}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group my-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: "" }); // Réinitialise l'erreur d'email lors de la saisie
                }}
                placeholder="Enter your email"
                required
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>

            <div className="form-group my-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: "" }); // Réinitialise l'erreur de mot de passe lors de la saisie
                }}
                placeholder="Enter your password"
                required
              />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
