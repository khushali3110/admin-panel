import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const CategoryManager = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

 
  useEffect(() => {
    const savedCategories = localStorage.getItem('categories');
    
    if (savedCategories) {
    
      const parsedCategories = JSON.parse(savedCategories);
      setCategories(parsedCategories);
    } else {
    
      const initialCategories = [
        // { id: 1, name: 'Electronics', subcategory: 'Mobile Phones', createdAt: '2024-08-21', updatedAt: '2024-08-21' },
        // { id: 2, name: 'Perfume', subcategory: 'Men Perfume', createdAt: '2024-08-20', updatedAt: '2024-08-22' },
        // { id: 3, name: 'Clothing', subcategory: 'Men Clothing', createdAt: '2024-08-19', updatedAt: '2024-08-19' },
        // { id: 4, name: 'Home & Kitchen', subcategory: 'Kitchenware', createdAt: '2024-08-18', updatedAt: '2024-08-20' },
        // { id: 5, name: 'Sports', subcategory: 'Fitness', createdAt: '2024-08-17', updatedAt: '2024-08-17' },
        // { id: 6, name: 'Books', subcategory: 'Fiction', createdAt: '2024-08-16', updatedAt: '2024-08-18' }
      ];
      setCategories(initialCategories);
      localStorage.setItem('categories', JSON.stringify(initialCategories));
    }
    
    setIsInitialized(true);
  }, []);

 
  useEffect(() => {
    if (isInitialized && categories.length >= 0) {
      localStorage.setItem('categories', JSON.stringify(categories));
    }
  }, [categories, isInitialized]);

  const onSubmit = async (data) => {
    if (isEditing && editingCategory) {
     
      const updatedCategories = categories.map(cat =>
        cat.id === editingCategory.id
          ? {
              ...cat,
              name: data.categoryName,
              subcategory: data.subcategory,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : cat
      );
      setCategories(updatedCategories);
      alert('Category updated successfully!');
      setIsEditing(false);
      setEditingCategory(null);
    } else {
     
      const newCategory = {
        id: Date.now(),
        name: data.categoryName,
        subcategory: data.subcategory,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      alert('Category added successfully!');
    }
    reset();
  };

  const handleDelete = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const updatedCategories = categories.filter(cat => cat.id !== categoryId);
      setCategories(updatedCategories);
      alert('Category deleted successfully!');
      
     
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
    }
  };

  const handleEdit = (category) => {
    setIsEditing(true);
    setEditingCategory(category);
    setValue('categoryName', category.name);
    setValue('subcategory', category.subcategory);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingCategory(null);
    reset();
  };

 
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all categories? This cannot be undone!')) {
      setCategories([]);
      localStorage.setItem('categories', JSON.stringify([]));
      alert('All categories cleared!');
    }
  };

 
  const handleResetToInitial = () => {
    if (window.confirm('Reset to initial categories?')) {
      const initialCategories = [
        { id: 1, name: 'Electronics', subcategory: 'Mobile Phones', createdAt: '2024-08-21', updatedAt: '2024-08-21' },
        { id: 2, name: 'Perfume', subcategory: 'Men Perfume', createdAt: '2024-08-20', updatedAt: '2024-08-22' },
        { id: 3, name: 'Clothing', subcategory: 'Men Clothing', createdAt: '2024-08-19', updatedAt: '2024-08-19' },
        { id: 4, name: 'Home & Kitchen', subcategory: 'Kitchenware', createdAt: '2024-08-18', updatedAt: '2024-08-20' },
        { id: 5, name: 'Sports', subcategory: 'Fitness', createdAt: '2024-08-17', updatedAt: '2024-08-17' },
        { id: 6, name: 'Books', subcategory: 'Fiction', createdAt: '2024-08-16', updatedAt: '2024-08-18' }
      ];
      setCategories(initialCategories);
      localStorage.setItem('categories', JSON.stringify(initialCategories));
      alert('Reset to initial categories!');
    }
  };

  return (
    <div className="container-fluid">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/admin">Dashboard</a></li>
          <li className="breadcrumb-item active">Category Management</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5>{isEditing ?
               'Edit Category'
                
                :
                 'Add Category'}</h5>
              {isEditing && (
                <button className="btn btn-sm btn-secondary" onClick={handleCancelEdit}>
                  Cancel Edit
                </button>
              )}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">Category Name</label>
                  <input 
                    type="text" 
                    className="form-control"
                    {...register('categoryName', { required: true })}
                    placeholder="Enter category name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Subcategory</label>
                  <input 
                    type="text" 
                    className="form-control"
                    {...register('subcategory', { required: true })}
                    placeholder="Enter subcategory name"
                  />
                </div>

                <button type="submit" className="btn btn-primary me-2">
                  {isEditing ? 'Update Category' : 'Add Category'}
                </button>
                <button type="button" onClick={() => reset()} className="btn btn-secondary">
                  Reset Form
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <div>
                <h5>Existing Categories</h5>
                {/* <small className="text-muted">Data saved permanently in browser</small> */}
              </div>
              <div>
                <span className="badge bg-primary me-2">{categories.length} Categories</span>
                <button 
                  className="btn btn-sm btn-outline-success me-2"
                  onClick={handleResetToInitial}
                  title="Reset to initial data"
                >
                  Reset Data
                </button>
                <button 
                  className="btn btn-sm btn-outline-danger"
                  onClick={handleClearData}
                  title="Clear all data"
                >
                  Clear All
                </button>
              </div>
            </div>
            <div className="card-body">
              {categories.length > 0 ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Category Name</th>
                      <th>Subcategory</th>
                      <th>Created</th>
                      <th>Updated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map(category => (
                      <tr key={category.id}>
                        <td>
                          <strong>{category.name}</strong>
                          {editingCategory?.id === category.id && (
                            <span className="badge bg-warning ms-2">Editing</span>
                          )}
                        </td>
                        <td>{category.subcategory}</td>
                        <td>{new Date(category.createdAt).toLocaleDateString()}</td>
                        <td>{new Date(category.updatedAt).toLocaleDateString()}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => handleEdit(category)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(category.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center text-muted py-4">
                  <p>No categories found. Add your first category!</p>
                  <button 
                    className="btn btn-primary"
                    onClick={handleResetToInitial}
                  >
                    Load Sample Categories
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;