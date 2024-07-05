import React, { createContext, useState } from 'react';

const FavsContext = createContext({
  favorites: [],
  setFavorites: () => {},
  removeFromFavs: () => {},});

const FavsProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(
    localStorage.getItem('favs') ? JSON.parse(localStorage.getItem('favs')) : []
  );

  const addToFavs = (user) => {
    setFavorites(prevFavs => [...prevFavs, user]);
    localStorage.setItem('favs', JSON.stringify([...favorites, user]));
  };

  const removeFromFavs = (user) => {
    setFavorites(favorites.filter((fav) => fav.id !== user.id));
    localStorage.setItem('favs', JSON.stringify(favorites.filter((fav) => fav.id !== user.id)));
  };

  return (
    <FavsContext.Provider value={{ favorites, setFavorites: addToFavs, removeFromFavs }}>
      {children}
    </FavsContext.Provider>
  );
};

export { FavsContext, FavsProvider };
