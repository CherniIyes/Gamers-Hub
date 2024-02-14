import React from 'react';
import Product from './Products/product'; // Ensure correct path to the Product component
import Home from './HomePage/Home';

export default function Page() {
  return (
    <div>
      <div>page</div>
      <h1>product</h1>
      <h1>Home</h1>
      <Product /> {/* Render the Product component */}
    </div>
  );
}
