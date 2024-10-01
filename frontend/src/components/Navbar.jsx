import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item"><a className="nav-link" href="/">Dashboard</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Customer</a></li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">Order</a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Order to Principal</a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">Inventory</a>
            <div className="dropdown-menu">
              <Link to="/" className="dropdown-item">Inventory Summary</Link>
              <Link to="/report" className="dropdown-item">Stock Receipt</Link>
              <Link to="/add-item" className="dropdown-item">Stock Adjustment</Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">Sales</a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">New Order</a>
              <a className="dropdown-item" href="#">Invoice</a>
              <a className="dropdown-item" href="#">Picklist</a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">Return</a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Add Return</a>
              <a className="dropdown-item" href="#">Credit Note</a>
              <a className="dropdown-item" href="#">Manage Returns</a>
            </div>
          </li>
          <li className="nav-item"><a className="nav-link" href="#">Promotion</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Complain</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
