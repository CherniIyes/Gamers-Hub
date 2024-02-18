// Product.js

'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Product.css'; // Importing the CSS file for styling
import { FaShoppingCart } from "react-icons/fa";


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
  const [cart, setCart] = useState([]);



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
    <div className="forSell">
        <nav className="navbar">
        <div className="logo"><FaShoppingCart/></div>
        <div className="nav-links">
          <button className="mine hover" onClick={() => alert('View Cart')}>Cart ({cart.length})</button>
        </div>
      </nav>
      <div className="product-background">
        <div className="background-content">
          <h2>Welcome to our Accessories Store</h2>
          {/* <p>Immerse yourself in the ultimate gaming experience with our extensive collection of games and accessories. Whether you're a casual gamer or a competitive player, we have everything you need to take your gaming to the next level.</p>
          <p>Discover the latest releases, classic favorites, and exclusive accessories that will enhance your gameplay and elevate your gaming setup. From high-performance gaming keyboards and mice to immersive VR headsets and stylish gaming chairs, we've got you covered.</p>
          <p>Experience unparalleled graphics, seamless gameplay, and immersive sound quality with our top-of-the-line gaming gear. Dominate the virtual battlefield, embark on epic adventures, and connect with fellow gamers from around the world.</p>
          <p>Join our gaming community, stay updated on the latest gaming trends, and unleash your full gaming potential with our premium products and expert recommendations. Level up your gaming experience with us today!</p>
          <p>Shop now and unlock a world of endless entertainment and excitement. Whether you're looking for the latest AAA titles or must-have gaming accessories, we've curated the ultimate selection to satisfy all your gaming needs. Elevate your gaming experience and join us on the journey to gaming greatness!</p> */}
        </div>
      </div>
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
          <div className="button-container">
            <button className="save-button" onClick={handleSaveUpdate}>Save Update</button>
            <button className="cancel-button" onClick={handleCancelUpdate}>Cancel</button>
          </div>
        </div>
      ) : selectedProduct ? (
        <div className="details-container">
          <h5 className="card-title">{selectedProduct.name}</h5>
          <img className="card-img-top" src={selectedProduct.image} alt="Product" onClick={() => handleImageClick(selectedProduct)} />
          <p className="card-text">Description: {selectedProduct.description}</p>
          <p className="card-text">Price: {selectedProduct.price}</p>
          <div className="button-container">
            <button className="delete-button" onClick={() => handleDelete(selectedProduct.id)}>Delete</button>
            <button className="update-button" onClick={() => handleUpdate(selectedProduct)}>Update</button>
            <button className="back-button" onClick={() => setSelectedProduct(null)}>Back to List</button>
          </div>
        </div>
      ) : (
        <>
          <input
            className="finTlawej"
            type="text"
            placeholder="Search Product name or description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
           <div className='hi'>
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
                    <h6 className="heloo">{product.name}</h6>
                    <p className="heloo">Description: {product.description}</p>
                    <p className="heloo">Price: {product.price}</p>
                    <button className="mine hover" onClick={() => addToCart(product)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Product;
