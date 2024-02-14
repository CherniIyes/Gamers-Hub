// src/app/Products/products.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Product() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    id: null,
    name: '',
    description: '',
    price: '',
    image: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:4000/products/getAll') // Update endpoint
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/products/${id}`) // Update endpoint
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
        setSelectedProduct(null);
        setUpdateMode(false);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (product) => {
    setSelectedProduct(null);
    setUpdateMode(true);
    setUpdatedProduct(product);
  };

  const handleCancelUpdate = () => {
    setUpdateMode(false);
    setUpdatedProduct({
      id: null,
      name: '',
      description: '',
      price: '',
      image: '',
    });
  };

  const handleSaveUpdate = () => {
    axios
      .put(`http://localhost:4000/products/${updatedProduct.id}`, updatedProduct) // Update endpoint
      .then(() => {
        setProducts(products.map((item) => (item.id === updatedProduct.id ? updatedProduct : item)));
        setUpdateMode(false);
        setUpdatedProduct({
          id: null,
          name: '',
          description: '',
          price: '',
          image: '',
        });
      })
      .catch((err) => console.log(err));
  };

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setUpdateMode(false);
  };

  const handleInputChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const filteredProducts = products.filter((product) => {
    return (
      (product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="container mt-5">
      {updateMode ? (
        <div className="update-container">
          {/* Update input fields as needed */}
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={updatedProduct.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={updatedProduct.description}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Price"
            name="price"
            value={updatedProduct.price}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Image URL"
            name="image"
            value={updatedProduct.image}
            onChange={handleInputChange}
          />
          <button onClick={handleSaveUpdate}>Save Update</button>
          <button onClick={handleCancelUpdate}>Cancel</button>
        </div>
      ) : selectedProduct ? (
        <div className="details-container">
          <h5 className="card-title">{selectedProduct.name}</h5>
          <img className="card-text" src={selectedProduct.image} alt="Product" />
          <p className="card-text">Description: {selectedProduct.description}</p>
          <p className="card-text">Price: {selectedProduct.price}</p>
          <button onClick={() => handleDelete(selectedProduct.id)}>Delete</button>
          <button onClick={() => handleUpdate(selectedProduct)}>Update</button>
          <button onClick={() => setSelectedProduct(null)}>Back to List</button>
        </div>
      ) : (
        <>
          <input
            className="search"
            type="text"
            placeholder="Search Product name or description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="row row-cols-1 row-cols-md-2 g-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col mb-4">
                <div className="card h-100 lose-card">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt="Product Image"
                    onClick={() => handleImageClick(product)}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Description: {product.description}</p>
                    <p className="card-text">Price: {product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Product;
