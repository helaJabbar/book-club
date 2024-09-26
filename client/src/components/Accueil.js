import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import './Accueil.css'; // Assurez-vous que les styles de la page d'accueil sont bien chargés

const Accueil = () => {
  const [recentBooks, setRecentBooks] = useState([]);

  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/books');
        setRecentBooks(response.data);  
      } catch (error) {
        console.error('Erreur lors de la récupération des livres récents', error);
      }
    };
    fetchRecentBooks();
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Bienvenue sur Book Club</h1>
        <p>Explorez et découvrez votre prochaine lecture préférée !</p>
      </section>

      <section className="features">
        <h1 className='before'>Pourquoi utiliser Book Club ?</h1>
        <ul>
          <li>Explorez une vaste bibliothèque de livres</li>
          <li>Ajoutez vos livres préférés à vos favoris</li>
          <li>Partagez vos recommandations avec d'autres lecteurs</li>
        </ul>
      </section>

      <section className="recent-books">
        <h1>Derniers livres ajoutés</h1>
        <Carousel>
          {recentBooks.map((book) => (
            <Carousel.Item key={book._id} interval={1000}>
              <img
                className="d-block w-100"
                src={`http://localhost:8000${book.imageUrl}`}
                alt={book.title}
                style={{ maxHeight: '300px', objectFit: 'cover' }}  
              />
              <Carousel.Caption>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
    </div>
  );
};

export default Accueil;
