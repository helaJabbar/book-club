import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";  
import axios from "axios";
import "./Form.css";

const Register = () => {
  const { user } = useContext(UserContext); // Obtenir l'utilisateur connecté depuis le contexte
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [alreadyLoggedInMessage, setAlreadyLoggedInMessage] = useState(""); // Déclaration du state pour gérer le message

  // Si l'utilisateur est connecté, afficher un message et rediriger
  useEffect(() => {
    if (user) {
      setAlreadyLoggedInMessage("Vous êtes déjà connecté.");
      // Redirection après un certain délai pour que l'utilisateur puisse voir le message
      setTimeout(() => {
        navigate("/"); // Rediriger vers la page d'accueil après 3 secondes
      }, 3000);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({});
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      setErrors({ confirmPassword: "Les mots de passe ne correspondent pas" });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/books/register",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }
      );

      setSuccess(response.data.msg);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data.errors) {
        const fieldErrors = {};
        Object.keys(err.response.data.errors).forEach((key) => {
          fieldErrors[key] = err.response.data.errors[key];
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ general: "Erreur lors de l'inscription" });
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center book-club-title">Register</h2>

      {/* Message si l'utilisateur est déjà connecté */}
      {alreadyLoggedInMessage && (
        <div className="alert alert-info text-center">{alreadyLoggedInMessage}</div>
      )}

      {!user && (
        <>
          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px" }}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="8"
              />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength="8"
              />
              {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Register;
