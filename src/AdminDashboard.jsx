import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCategories: 0,
    totalProducts: 24,
    totalUsers: 150,
    totalOrders: 45
  });

  useEffect(() => {
    // Load categories from localStorage
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      const categories = JSON.parse(savedCategories);
      setStats(prevStats => ({
        ...prevStats,
        totalCategories: categories.length
      }));
    }
  }, []);

  const quickActions = [
    {
      title: "Add New Category",
      description: "Create new product categories",
      icon: "📁",
      action: () => alert("Navigate to Add Category")
    },
    {
      title: "View All Categories", 
      description: "Manage existing categories",
      icon: "📊",
      action: () => alert("Navigate to Categories List")
    },
    {
      title: "Recent Activities",
      description: "Check latest updates",
      icon: "🔄",
      action: () => alert("Show Recent Activities")
    },
    {
      title: "System Settings",
      description: "Configure admin settings", 
      icon: "⚙️",
      action: () => alert("Open Settings")
    }
  ];

  return (
    <div className="container-fluid">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">Dashboard</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Categories</h5>
              <p className="card-text display-4">{stats.totalCategories}</p>
              <small>Total Categories</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Products</h5>
              <p className="card-text display-4">{stats.totalProducts}</p>
              <small>Total Products</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card text-white bg-info mb-3">
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <p className="card-text display-4">{stats.totalUsers}</p>
              <small>Registered Users</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Orders</h5>
              <p className="card-text display-4">{stats.totalOrders}</p>
              <small>Total Orders</small>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5>Quick Actions</h5>
              <p className="text-muted mb-0">Quick access to frequently used features</p>
            </div>
            <div className="card-body">
              <div className="row">
                {quickActions.map((action, index) => (
                  <div key={index} className="col-md-3 mb-3">
                    <div 
                      className="card h-100 action-card shadow-sm" 
                      style={{cursor: 'pointer', transition: 'all 0.3s'}}
                      onClick={action.action}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <div className="card-body text-center">
                        <div className="display-4 mb-2">{action.icon}</div>
                        <h6 className="card-title">{action.title}</h6>
                        <p className="card-text text-muted small">{action.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5>Recent Activity</h5>
            </div>
            <div className="card-body">
              <div className="list-group">
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <span className="badge bg-success me-2">New</span>
                    Category "Electronics" was added
                  </div>
                  <small className="text-muted">2 minutes ago</small>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <span className="badge bg-primary me-2">Update</span>
                    Category "Perfume" was updated
                  </div>
                  <small className="text-muted">5 minutes ago</small>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <span className="badge bg-info me-2">Info</span>
                    System backup completed
                  </div>
                  <small className="text-muted">1 hour ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;