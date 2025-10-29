import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ProductForm = () => {
  const { register, handleSubmit, watch, reset } = useForm();
  
  const selectedCategory = watch('category');
  
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    // Mock categories
    setCategories([
      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Perfume' },
      { id: 3, name: 'Clothing' }
    ]);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      // Mock subcategories
      if (selectedCategory === '1') {
        setSubcategories([
          { id: 1, name: 'Mobile Phones' },
          { id: 2, name: 'Laptops' }
        ]);
      } else if (selectedCategory === '2') {
        setSubcategories([
          { id: 3, name: 'Men Perfume' },
          { id: 4, name: 'Women Perfume' }
        ]);
      }
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory]);

  const onSubmit = (data) => {
    console.log('Product Data:', data);
    alert('Product Added Successfully!');
    reset();
  };

  return (
    <div className="container mt-4">
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input 
            type="text" 
            className="form-control"
            {...register('productName', { required: true })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select 
            className="form-control"
            {...register('category', { required: true })}
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && (
          <div className="mb-3">
            <label className="form-label">Subcategory</label>
            <select 
              className="form-control"
              {...register('subcategory')}
            >
              <option value="">Select Subcategory</option>
              {subcategories.map(sub => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="button" onClick={() => reset()} className="btn btn-secondary ms-2">
          Reset
        </button>
      </form>
    </div>
  );
};

export default ProductForm;