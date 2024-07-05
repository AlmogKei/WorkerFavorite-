import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployeeContext } from '../context/EmployeeContext';

const Favorites = () => {
  const { favorites, removeFavorite } = useEmployeeContext();
  const navigate = useNavigate();

  const handleEmployeeDetailsClick = (index) => {
    navigate(`/employee?company=favorites&index=${index}`);
  };

  return (
    <div className='container mt-3'>
      <h4>Favorite Employees</h4>
      {favorites.length > 0 ? (
        <ul className='list-group'>
          {favorites.map((employee, index) => (
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
                <button className='btn btn-danger ml-2' onClick={() => removeFavorite(employee.login.uuid)}>Remove Favorite</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite employees.</p>
      )}
    </div>
  );
};

export default Favorites;
