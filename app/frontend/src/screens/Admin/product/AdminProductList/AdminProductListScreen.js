import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../../../pieces/Message/Message';
import Loader from '../../../../pieces/Loader/Loader';
import Paginate from '../../../../components/Paginate/Paginate';
import {
    deleteProduct,
    listProducts,
    createProduct,
} from '../../../../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../../../../constants/productConstants';

const AdminProductListScreen = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const params = useParams();
    const pageNumber = params.pageNumber || ``;
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, pages, page } = productList;
    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;
    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });
        if (!userInfo.isAdmin) {
            history('/');
        }
        if (successCreate) {
            history(`/admin/product/${createdProduct._id}/edit`);
        }
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts('', pageNumber));
        } else {
            history('/');
        }
    }, [dispatch, userInfo, history, successDelete, successCreate, pageNumber]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure to delete this product?')) {
            dispatch(deleteProduct(id));
        }
    };
    const createProductHandler = () => {
        dispatch(createProduct());
    };
    return (
        <div className="grid">
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"> Create Product</i>
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm"
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price Original</th>
                                <th>Price Sale</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price_org}</td>
                                    <td>${product.price_sale}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer
                                            to={`/admin/product/${product._id}/edit`}
                                        >
                                            <Button
                                                variant="primary"
                                                className="btn-sm"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant="danger"
                                            className="btn-sm"
                                            onClick={() => {
                                                deleteHandler(product._id);
                                            }}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate
                        pages={pages}
                        page={page}
                        isAdmin={true}
                    ></Paginate>
                </>
            )}
        </div>
    );
};

export default AdminProductListScreen;
