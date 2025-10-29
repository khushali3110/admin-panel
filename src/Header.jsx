import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Admin Dashboard</span>
        
        <div className="d-flex align-items-center">
          <span className="text-light me-3">
            Welcome, <strong>{user?.name}</strong>
          </span>
          <button 
            className="btn btn-outline-light btn-sm"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;