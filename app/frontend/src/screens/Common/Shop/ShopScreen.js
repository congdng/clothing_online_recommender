import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../../actions/productActions';
import Message from '../../../pieces/Message/Message';
import Loader from '../../../pieces/Loader/Loader';
import Paginate from '../../../components/Paginate/Paginate';
import { useParams } from 'react-router-dom';
import './ShopScreen.css';

const ShopScreen = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [category, setCategory] = useState('');
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;
    const keyword = params.keyword;
    const pageNumber = params.pageNumber || 1;
    const limit = 16;
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber, category, limit));
    }, [dispatch, keyword, pageNumber]);
    return (
        <div className="grid home_wrapper">
            <h1>Product List</h1>
            {typeof loading === 'undefined' ? (
                <Loader />
            ) : loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ''}
                    ></Paginate>
                </>
            )}
        </div>
    );
};

export default ShopScreen;
