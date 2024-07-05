import React, { createContext, useState, useContext } from 'react';

const EmployeeContext = createContext();

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  }
  return context;
};

export const EmployeeProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (employee) => {
    setFavorites((prevFavorites) => [...prevFavorites, employee]);
  };

  const removeFavorite = (employeeId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((employee) => employee.login.uuid !== employeeId)
    );
  };

  return (
    <EmployeeContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </EmployeeContext.Provider>
  );
};
