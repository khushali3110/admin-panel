import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Header from './Header';
import AdminDashboard from './AdminDashboard';
import CategoryManager from './CategoryManager';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Check if user is already logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('user');
    
    if (loggedIn === 'true' && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (success) => {
    if (success) {
      setIsLoggedIn(true);
      const userData = localStorage.getItem('user');
      setUser(JSON.parse(userData));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setActiveTab('dashboard');
  };

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      {/* Header */}
      <Header user={user} onLogout={handleLogout} />

      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="navbar-nav">
            <button 
              className={`nav-link btn ${activeTab === 'dashboard' ? 'btn-primary text-white' : 'btn-link'}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={`nav-link btn ${activeTab === 'categories' ? 'btn-primary text-white' : 'btn-link'}`}
              onClick={() => setActiveTab('categories')}
            >
              Category Management
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-fluid mt-3">
        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'categories' && <CategoryManager />}
      </div>
    </div>
  );
}

export default App;