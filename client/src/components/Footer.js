import React from 'react';
import './Footer.css';  // Assure-toi d'ajouter un fichier CSS pour le style

const Footer = () => {
  return (
    <footer className="footer">
      <a href="https://github.com/helaJabbar" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-github footer-icon"></i>
      </a>
      <p>© 2024 book CLUB. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
