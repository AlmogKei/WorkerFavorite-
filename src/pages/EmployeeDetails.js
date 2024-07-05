import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEmployeeContext } from '../context/EmployeeContext';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/EmployeeDetails.css';

const EmployeeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const company = queryParams.get('company');
  const index = parseInt(queryParams.get('index'), 10);

  const [employee, setEmployee] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useEmployeeContext();

  useEffect(() => {
    console.log(`Company: ${company}, Index: ${index}`);
    if (company === 'favorites') {
      const favoriteEmployee = favorites[index];
      if (favoriteEmployee) {
        setEmployee(favoriteEmployee);
      } else {
        navigate('/');
      }
    } else {
      const savedEmployees = localStorage.getItem('employees');
      const employees = savedEmployees ? JSON.parse(savedEmployees) : [];
      if (company && !isNaN(index) && employees[index]) {
        setEmployee(employees[index]);
      } else {
        navigate('/');
      }
    }
  }, [index, navigate, company, favorites]);

  const isFavorite = (employeeId) => {
    return favorites.some(fav => fav.login.uuid === employeeId);
  };

  if (!employee) {
    return <p>Employee not found</p>;
  }

  return (
    <div className="employee-details">
      <div className="details-container">
        <button
          className='btn btn-secondary mb-3'
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
        <img src={employee.picture.large} alt={`${employee.name.first} ${employee.name.last}`} />
        <div className="details">
          <h2>{employee.name.title} {employee.name.first} {employee.name.last}</h2>
          <p><strong>Age:</strong> {employee.dob.age}</p>
          <p><strong>Location:</strong> {employee.location.city}, {employee.location.country}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Phone:</strong> {employee.phone}</p>

          <div className="map-container">
            <MapContainer
              center={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]} 
              zoom={9} 
              scrollWheelZoom={true} 
              style={{ height: '300px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={[employee.location.coordinates.latitude, employee.location.coordinates.longitude]}
              >
                <Tooltip>
                  <div>
                    <h3>{employee.name.first} {employee.name.last}</h3>
                    <p>Location: {employee.location.street.name}, {employee.location.city}, {employee.location.state}, {employee.location.country}, {employee.location.postcode}</p>
                  </div>
                </Tooltip>
              </Marker>
            </MapContainer>
          </div>

          {isFavorite(employee.login.uuid) ? (
            <button className='btn btn-remove' onClick={() => removeFavorite(employee.login.uuid)}>Remove Favorite</button>
          ) : (
            <button className='btn btn-favorite' onClick={() => addFavorite(employee)}>Save Favorite</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
