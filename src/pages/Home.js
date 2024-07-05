import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployeeContext } from '../context/EmployeeContext';
import '../css/Home.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { favorites, addFavorite, removeFavorite } = useEmployeeContext();

  const fetchData = async (company) => {
    const urls = [
      `https://randomuser.me/api/?results=10&seed=${company}`,
      `https://monkeys.co.il/api2/wo.php?results=10&seed=${company}`
    ];

    try {
      const response = await fetch(urls[0]);
      if (!response.ok) throw new Error('Primary API failed');
      const data = await response.json();
      setSearchResults(data.results);
      localStorage.setItem('employees', JSON.stringify(data.results));
    } catch (error) {
      try {
        const fallbackResponse = await fetch(urls[1]);
        if (!fallbackResponse.ok) throw new Error('Fallback API failed');
        const fallbackData = await fallbackResponse.json();
        setSearchResults(fallbackData.results);
        localStorage.setItem('employees', JSON.stringify(fallbackData.results));
      } catch (fallbackError) {
        setError('Failed to fetch data from both APIs');
      }
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    fetchData(searchTerm);
  };

  const handleEmployeeDetailsClick = (index) => {
    navigate(`/employee?company=${searchTerm}&index=${index}`);
  };

  const isFavorite = (employeeId) => {
    return favorites.some(fav => fav.login.uuid === employeeId);
  };

  return (
    <div>
      <div className='container p-5 bg-warning'>
        <div className='d-flex justify-content-center align-items-center'>
          <p>strip</p>
        </div>
      </div>
      <div className='container mt-3'>
        <div className='d-flex justify-content-center'>
          <input
            type="text"
            placeholder="Enter company name..."
            className='form-control w-50'
            value={searchTerm}
            onChange={handleChange}
          />
          <button className='btn btn-primary ml-2' onClick={handleSearchClick}>Search</button>
        </div>
        {error && <p className='text-danger'>{error}</p>}
        {searchResults.length > 0 && (
          <div className='mt-3'>
            <h4>Search Results</h4>
            <ul className='list-group'>
              {searchResults.map((employee, index) => (
                <li key={employee.login.uuid} className='list-group-item d-flex justify-content-between align-items-center'>
                  <div className='d-flex'>
                    <img src={employee.picture.medium} alt={employee.name.first} className='rounded-circle mr-2' />
                    <div>
                      <p>{employee.name.title} {employee.name.first} {employee.name.last}</p>
                      <p>Age: {employee.dob.age}</p>
                      <p>Location: {employee.location.city}, {employee.location.country}</p>
                    </div>
                  </div>
                  <div>
                    <button className='btn btn-info' onClick={() => handleEmployeeDetailsClick(index)}>Details</button>
                    {isFavorite(employee.login.uuid) ? (
                      <button className='btn btn-danger ml-2' onClick={() => removeFavorite(employee.login.uuid)}>Remove Favorite</button>
                    ) : (
                      <button className='btn btn-warning ml-2' onClick={() => addFavorite(employee)}>Save Favorite</button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
