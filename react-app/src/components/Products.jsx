import styled from 'styled-components';
import React from 'react'
import { popularProducts } from '../data';
import Product from './Product';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    `;

const Products = ({cat, filters, sort}) => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    cat ? setFilteredProducts(popularProducts.filter(item => item.cat === cat)) :
    setFilteredProducts(popularProducts);
  }, [cat])

  useEffect(() => {
    cat && setFilteredProducts(popularProducts.filter(item => item.cat === cat))
  }, [cat])

  useEffect(() => {
    setFilteredProducts(() => {
      if(sort === "newest") {
        return filteredProducts.sort((a,b) => a.id - b.id);
      }
      if(sort === "asc") {
        return filteredProducts.sort((a,b) => a.price - b.price);
      }
      if(sort === "desc") {
        return filteredProducts.sort((a,b) => b.price - a.price);
      }
      return filteredProducts;
    })
  }
  , [sort, cat])

  useEffect(() => {
    setFilteredProducts(() => {
      return popularProducts.filter(item => {
        for (const key in filters) {
          if (item[key] !== filters[key]) {
            return false;
          }
        }
        return true;
      })
    })
  }
  , [filters])

  
  return (
    <Container>
        {popularProducts.map((item) => (
          <Product item={item} key={item.id}/>
        ))}
    </Container>
  )
}

export default Products