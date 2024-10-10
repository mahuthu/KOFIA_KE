import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { publicRequest } from '../requestmethods';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const ContinueShoppingButton = styled(Button)`
  background-color: #000;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  margin: 20px auto;
  display: block;
`;

const ProductItem = styled(Link)`
  flex: 1 0 21%;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchTerm = new URLSearchParams(location.search).get('term');
    if (searchTerm) {
      setLoading(true);
      publicRequest.get(`/search?term=${searchTerm}`)
        .then(response => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError('Error fetching search results');
          setLoading(false);
          console.error('Search error:', error);
        });
    }
  }, [location.search]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <Container>
      <h2>Search Results</h2>
      <ContinueShoppingButton onClick={handleContinueShopping}>Continue Shopping</ContinueShoppingButton>
      <ProductList>
        {products.map(product => (
          <ProductItem key={product._id} to={`/product/${product._id}`}>
            <img src={product.imageUrl} alt={product.title} style={{maxWidth: '100%', maxHeight: '200px'}} />
            <h3>{product.title}</h3>
            <p>KSH{product.price}</p>
          </ProductItem>
        ))}
      </ProductList>
    </Container>
  );
};

export default SearchResults;