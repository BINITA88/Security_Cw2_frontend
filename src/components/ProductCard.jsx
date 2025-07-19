import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleDoubleClick = () => {
    window.open(`https://localhost:5000/products/${product.productImage}`, '_blank');
  };

  const handleViewMore = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="book-card">
      <div className="book-image">
        <img
          src={`https://localhost:5000/products/${product.productImage}`}
          alt={product.productName}
          onDoubleClick={handleDoubleClick}
        />
      </div>
      <div className="book-info">
        <h5 className="book-title">{product.productName}</h5>
        <p className="book-category">{product.productCategory || 'Unknown Category'}</p>
        <p className="book-price">NPR {product.productPrice}</p>
        <p className="book-description">{product.productDescription.slice(0, 60)}...</p>
        <button onClick={handleViewMore} className="book-button">
          View More
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
