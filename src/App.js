import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import EmployeeDetails from './pages/EmployeeDetails';
import { EmployeeProvider } from './context/EmployeeContext';

const App = () => {
  return (
    <BrowserRouter>
      <EmployeeProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/employee" element={<EmployeeDetails />} />
        </Routes>
      </EmployeeProvider>
    </BrowserRouter>
  );
};

export default App;
