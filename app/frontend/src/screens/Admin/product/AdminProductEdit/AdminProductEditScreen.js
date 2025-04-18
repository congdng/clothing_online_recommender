import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    Button,
    Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../../../pieces/Message/Message';
import Loader from '../../../../pieces/Loader/Loader';
import FormContainer from '../../../../components/Form/FormContainer';
import { listProductDetail, updateProduct } from '../../../../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../../../../constants/productConstants';
import axios from 'axios';

const AdminProductEditScreen = () => {
    const [price, setPrice] = useState(0);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const location = useLocation();
    const params = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const productId = params.id;
    const productDetail = useSelector((state) => state.productDetail);
    const { loading, error, product } = productDetail;
    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            history('/admin/productlist');
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetail(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [product, dispatch, productId, history, successUpdate]);
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            const { data } = await axios.post('/api/upload', formData, config);
            console.log(data);
            setImage(data.substring(1));
            setUploading(false);
        } catch (e) {
            setUploading(false);
        }
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: productId,
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock,
            }),
        );
    };

    return (
        <div className="grid">
            <Link to="/admin/productlist" className="btn btn-light my-3">
                Go Back
            </Link>
            {/* {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && (
                    <Message variant="danger">{errorUpdate}</Message>
                )}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Product Name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Price"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="image">
                            <Form.Label>Image Directory</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Image URL"
                                value={image}
                                onChange={(e) => {
                                    setImage(e.target.value);
                                }}
                            ></Form.Control>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Or Upload Product Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={uploadFileHandler}
                                />
                            </Form.Group>
                            {uploading && <Loader />}
                        </Form.Group>
                        <Form.Group controlId="brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Brand"
                                value={brand}
                                onChange={(e) => {
                                    setBrand(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="countInStock">
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Quality"
                                value={countInStock}
                                onChange={(e) => {
                                    setCountInStock(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Category"
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Description"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    );
};

export default AdminProductEditScreen;
