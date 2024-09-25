import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import './Accueil.css'; 
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Bienvenue sur Book Club</h1>
        <p>Explorez et découvrez votre prochaine lecture préférée !</p>
      </section>

      <section className="features">
        <h1 className='before' >Pourquoi utiliser Book Club ?</h1>
        <ul >
          <li >Explorez une vaste bibliothèque de livres</li>
          <li>Ajoutez vos livres préférés à vos favoris</li>
          <li>Partagez vos recommandations avec d'autres lecteurs</li>
        </ul>
      </section>

      <section className="recent-books">
        <h1>Derniers livres ajoutés</h1>
        <Slider {...settings}>
          {recentBooks.map((book) => (
            <div key={book._id} className="book-slide">
              <img src={`http://localhost:8000${book.imageUrl}`} alt={book.title} className="book-slide-image" />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
          ))}
        </Slider>
      </section>

    </div>
  );
};

export default Accueil;
