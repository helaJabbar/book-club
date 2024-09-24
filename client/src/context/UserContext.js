import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    userId: localStorage.getItem('userId') || '',  // Récupère l'ID utilisateur du localStorage
  });

  // Fonction pour mettre à jour l'utilisateur lors de la connexion
  const handleLogin = (firstName, lastName, userId) => {
    console.log("Mise à jour du contexte utilisateur :", { firstName, lastName, userId });  // Ajout du log pour vérifier

    setUser({ firstName, lastName, userId });

    // Stocker dans le localStorage
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('userId', userId);  // Stocke l'ID utilisateur dans le localStorage
  };

  const handleLogout = () => {
    setUser({ firstName: '', lastName: '', userId: '' });
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('userId');  // Supprimer l'ID utilisateur lors de la déconnexion
  };

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
