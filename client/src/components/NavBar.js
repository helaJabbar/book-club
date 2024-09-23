import React from "react"; // Importer useState
import { Link } from "react-router-dom";
import "./Navbar.css";

import loginIcon from "../assets/login.png"; // Chemin vers l'icône Login
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour gérer la connexion

  

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <h2 className="book-club-title">Book Club</h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books">Book List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/NewBook">New Book</Link>
            </li>
          </ul>
          <div className="navbar-nav ml-auto">
            
              
              <Link to="/login" className="nav-link btn btn-link" >
                <img
                  src={loginIcon}
                  alt="Login"
                  className="avatar img-fluid"
                />
              </Link>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;