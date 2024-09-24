import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
    userId: localStorage.getItem('userId') || '', 
  });

  // Fonction pour mettre à jour l'utilisateur lors de la connexion
  const handleLogin = (firstName, lastName, userId) => {
    console.log("Mise à jour du contexte utilisateur :", { firstName, lastName, userId });  

    setUser({ firstName, lastName, userId });

  
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('userId', userId); 
  };

  const handleLogout = () => {
    setUser({ firstName: '', lastName: '', userId: '' });
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('userId'); 
    window.location.reload();
  };

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
