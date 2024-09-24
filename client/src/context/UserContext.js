import React, { createContext, useState } from 'react';

// Crée le contexte utilisateur
export const UserContext = createContext();

// Fournit le contexte à toute l'application
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    firstName: localStorage.getItem('firstName') || '',
    lastName: localStorage.getItem('lastName') || '',
  });

  const handleLogin = (firstName, lastName) => {
    setUser({ firstName, lastName });
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
  };

  const handleLogout = () => {
    setUser({ firstName: '', lastName: '' });
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
  };

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
