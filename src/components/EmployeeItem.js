import React, { useContext } from 'react';
import EmployeeContext from './context/EmployeeContext';

const EmployeeItem = ({ employee, isFavorite }) => {
  const { favorites, setFavorites } = useContext(EmployeeContext);

  const toggleFavorite = () => {
    const updatedFavorites = [...favorites];
    const index = updatedFavorites.findIndex((fav) => fav.id === employee.id);

    if (index !== -1) {
      updatedFavorites.splice(index, 1);
    } else {
      updatedFavorites.push(employee);
    }

    setFavorites(updatedFavorites);
  };

  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between">
        <div>
          <img
            src={employee.picture.medium}
            alt={employee.name.first}
            className="rounded-circle mr-2"
            style={{ width: '30px', height: '30px' }} // Closing parenthesis added here
          />
        </div>
        <div>
          <h5>{employee.name.title} {employee.name.first} {employee.name.last}</h5>
          <p>
            {employee.location.city}, {employee.location.country}
          </p>
        </div>
        <div className="d-flex align-items-center">
          {isFavorite ? (
            <button className="btn btn-sm btn-danger" onClick={toggleFavorite}>
              Remove Favorite
            </button>
          ) : (
            <button className="btn btn-sm btn-primary" onClick={toggleFavorite}>
              Add Favorite
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default EmployeeItem;
