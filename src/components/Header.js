import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="container-fluid bg-primary">
      <div className="container p-2">
        <div className="row justify-content-center align-items-center">
          <nav className="col-auto">
            <ul className="nav-list">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>|</li>
              <li>
                <Link to="/Favorites">Favorites</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
