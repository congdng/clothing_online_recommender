import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import Message from '../../../pieces/Message/Message';
import { addToCart, removeFromCart } from '../../../actions/cartActions'
import {
    Row,
    Col,
    Image,
    ListGroup,
    Button,
    Form,
    Card,
} from 'react-bootstrap';
import './CartScreen.css';

const CartScreen = () => {
    const params = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useNavigate();
    const productId = params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        history('/login?redirect=/checkout/shipping');
    };

    return (
        <div className="grid cart_screen">
            <Row>
                <Col md={8}>
                    <h1>YOUR CART</h1>
                    {cartItems.length === 0 ? (
                        <Message>
                            Empty Cart <Link to="/">Go Back</Link>
                        </Message>
                    ) : (
                        <ListGroup variant="flush">
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.product}>
                                    <Row className="flex_display cart_product">
                                        <Col md={3}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fluid
                                                rounded
                                            />
                                        </Col>
                                        <Col md={3}>
                                            <Link
                                                to={`/product/${item.product}`}
                                            >
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col md={2}>
                                            {
                                                <Form.Control
                                                    as="select"
                                                    value={item.qty}
                                                    onChange={(e) =>
                                                        dispatch(
                                                            addToCart(
                                                                item.product,
                                                                Number(
                                                                    e.target
                                                                        .value,
                                                                ),
                                                            ),
                                                        )
                                                    }
                                                >
                                                    {[
                                                        ...Array(
                                                            item.countInStock,
                                                        ).keys(),
                                                    ].map((x) => (
                                                        <option
                                                            key={x + 1}
                                                            value={x + 1}
                                                        >
                                                            {' '}
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            }
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                type="button"
                                                variant="primary"
                                                onClick={() => {
                                                    removeFromCartHandler(
                                                        item.product,
                                                    );
                                                }}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>
                                    Subtotal (
                                    {cartItems.reduce(
                                        (acc, curItem) => acc + curItem.qty,
                                        0,
                                    )}
                                    ) items
                                </h2>
                                $
                                {cartItems
                                    .reduce(
                                        (acc, curItem) =>
                                            acc + curItem.qty * curItem.price,
                                        0,
                                    )
                                    .toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Check Out
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default CartScreen;
