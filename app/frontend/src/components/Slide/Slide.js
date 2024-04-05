import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../pieces/Loader/Loader';
import Message from '../../pieces/Message/Message';
import { listTopProducts } from '../../actions/productActions';
const Slide = () => {
    const dispatch = useDispatch();
    const productTop = useSelector((state) => state.productTop);
    const { loading, error, products } = productTop;
    useEffect(() => {
        dispatch(listTopProducts());
    }, [dispatch]);
    return loading ? (
        <Loader></Loader>
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <Carousel pause="hover" className="bg-dark">
            {products.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.imageLink} alt={product.name} fluid />
                        <Carousel.Caption className="carousel-caption">
                            <h2>
                                {product.name} (${product.price})
                            </h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default Slide;
