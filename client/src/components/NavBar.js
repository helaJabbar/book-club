import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginIcon from "../assets/login.png";
import logoutIcon from "../assets/logout.svg";
import { UserContext } from "../context/UserContext";
import "./Navbar.css";

const NavBar = () => {
  const { user, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNewBookClick = (e) => {
    if (!user.firstName) {
      e.preventDefault();
      navigate("/login");
    }
  };

  return (
    <>
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
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Accueil
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/books">
                  Book List
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/NewBook"
                  onClick={handleNewBookClick}
                >
                  New Book
                </Link>
              </li>
            </ul>
            <div className="navbar-nav ml-auto">
              {user.firstName ? (
                <>
                  <Link
                    to="/"
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                  >
                    <img
                      src={logoutIcon}
                      alt="Logout"
                      className="avatar img-fluid"
                    />
                  </Link>
                </>
              ) : (
                <Link to="/login" className="nav-link btn btn-link">
                  <img
                    src={loginIcon}
                    alt="Login"
                    className="avatar img-fluid"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {user.firstName && (
        <div className="welcome-message">
          <h3>
            Welcome <span id="span-firstName">{user.firstName}</span>{" "}
            <span id="span-lastName">{user.lastName}</span>
          </h3>
        </div>
      )}
    </>
  );
};

export default NavBar;
