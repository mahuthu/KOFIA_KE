import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import Announcement from '../components/Announcement';
import { Add, Remove } from '@material-ui/icons';
import { mobile } from '../responsive';
import { useLocation, useNavigate } from 'react-router-dom';
import { publicRequest } from "../requestmethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  background-color: #f5fbfd;
`;

const Wrapper = styled.div` 
    padding: 20px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
    flex: 1;
    ${mobile({ marginBottom: "20px" })}
`;

const Image = styled.img`
    width: 80%;
    height: 60vh;
    object-fit: cover;
    ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 500;
    ${mobile({ fontSize: "24px" })}
`;

const Desc = styled.p`
    margin: 20px 0px;
    font-weight: 500;
    ${mobile({ fontSize: "14px" })}
`;

const Price = styled.span`
    font-weight: 600;
    font-size: 23px;
    ${mobile({ fontSize: "20px" })}
`;

const FilterContainer = styled.div`
    width: 100%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
    margin-right: 10px;
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0px 5px;
    cursor: pointer;
    border: 1px solid #ddd;
`;

const FilterSize = styled.select`
    padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
    margin-bottom: 20px;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
    &:hover {
        background-color: teal;
        color: white;
    }
    ${mobile({ width: "100%", marginTop: "20px" })}
`;

const CountInStock = styled.p`
    margin-top: 10px;
    font-size: 14px;
    color: ${props => props.inStock ? "green" : "red"};
`;

const Product = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Use useNavigate for redirection
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Check if user is authenticated

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get(`/products/find/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        getProduct();
    }, [id]);

    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const handleClick = () => {
        console.log('Is Authenticated:', isAuthenticated);
        if (isAuthenticated) {
            console.log('Authenticated: Adding to cart and redirecting to /cart');
            dispatch(addProduct({ ...product, quantity, color, size }));
            navigate('/cart');
        } else {
            console.log('Not authenticated: Redirecting to /login');
            navigate('/login');
        }
    };

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.imageUrl} alt={product.title} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.description}</Desc>
                    <Price>KSH{product.price}</Price>
                    <CountInStock inStock={product.countInStock > 0}>
                        {product.countInStock > 0 
                            ? `In Stock: ${product.countInStock}`
                            : "Out of Stock"}
                    </CountInStock>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {Array.isArray(product.color) && product.color.map((c) => (
                                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e) => setSize(e.target.value)}>
                                <FilterSizeOption>Select Size</FilterSizeOption>
                                {Array.isArray(product.size) && product.size.map((s) => (
                                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuantity("dec")} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity("inc")} />
                        </AmountContainer>
                        <Button onClick={handleClick} disabled={product.countInStock === 0}>
                            {product.countInStock === 0 ? "OUT OF STOCK" : "ADD TO CART"}
                        </Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    );
};

export default Product;
