import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Button, Form, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../../pieces/Message/Message';
import Loader from '../../../pieces/Loader/Loader';
import {
    getuserDetails,
    updateUserProfile,
} from '../../../actions/userActions';
import { listUserOrders } from '../../../actions/orderActions';
import { logout } from '../../../actions/userActions';
import './ProfileScreen.css';

const ProfileScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState(null);
    const [menu, setMenu] = useState('account');
    const [editMenu, setEditMenu] = useState(false);
    const dispatch = useDispatch();
    const history = useNavigate();
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userUpdate = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdate;
    const userOrder = useSelector((state) => state.orderUser);
    const { loading: loadingOrder, error: errorOrder, orders } = userOrder;

    const logoutHandler = () => {
        dispatch(logout());
    };

    useEffect(() => {
        if (!userInfo) {
            history('/login');
        } else {
            if (!user.name) {
                dispatch(getuserDetails('profile'));
                dispatch(listUserOrders());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Password are not matched');
        } else {
            dispatch(
                updateUserProfile({ id: user._id, name, email, password }),
            );
        }
    };
    return (
        <div className="grid">
            <Row className="profile">
                <Col md={3}>
                    <ul>
                        <li
                            className={
                                menu === 'account'
                                    ? 'menu-item menu-item--active'
                                    : 'menu-item'
                            }
                        >
                            <div
                                className="profile__menu-choice"
                                onClick={() => {
                                    setMenu('account');
                                }}
                            >
                                <i className="mr-8 fa-regular fa-user"></i>
                                <span>Account details</span>
                            </div>
                        </li>
                        <li
                            className={
                                menu === 'order'
                                    ? 'menu-item menu-item--active'
                                    : 'menu-item'
                            }
                        >
                            <div
                                className="profile__menu-choice"
                                onClick={() => {
                                    setMenu('order');
                                    setEditMenu(false);
                                }}
                            >
                                <i className="mr-8 fa-brands fa-shopify"></i>
                                <span>Orders</span>
                            </div>
                        </li>
                        <li className="menu-item">
                            <div className="profile__menu-choice">
                                <i className="mr-8 fa-regular fa-credit-card"></i>
                                <span>Buying history</span>
                            </div>
                        </li>
                        <li className="menu-item">
                            <div
                                className="profile__menu-choice"
                                onClick={logoutHandler}
                            >
                                <i className="mr-8 fa-solid fa-arrow-right-from-bracket"></i>
                                <span>Logout</span>
                            </div>
                        </li>
                    </ul>
                </Col>
                <Col md={9}>
                    {menu === 'account' ? (
                        <div className="profile__section section--active">
                            <div className="heading d-flex justify-content-between align-items-center">
                                <h2>Your Profile</h2>
                                <button
                                    className="btn profile--btn"
                                    onClick={() => {
                                        setEditMenu(!editMenu);
                                    }}
                                >
                                    <span>Edit Profile</span>
                                </button>
                            </div>
                            <div className="section--items row align-items-center mt-5">
                                <div className="section--item col-lg-2">
                                    <img
                                        src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                                        alt=""
                                    />
                                </div>
                                <div className="section--item col-lg-4">
                                    <h2>Name</h2>
                                    <span>{user.name}</span>
                                </div>
                                <div className="section--item col-lg-3">
                                    <h2>Email</h2>
                                    <span>{user.email}</span>
                                </div>
                                <div className="section--item col-lg-3 d-flex justify-content-end">
                                    <button className="btn">
                                        <div
                                            onClick={() => {
                                                setEditMenu(!editMenu);
                                            }}
                                        >
                                            <span>Change Pass.</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                    {editMenu === true ? (
                        <div className="account_edit">
                            <h2>Update your profile</h2>
                            {message && (
                                <Message variant="danger">{message}</Message>
                            )}
                            {error && (
                                <Message variant="danger">{error}</Message>
                            )}
                            {success && (
                                <Message variant="success">
                                    'Profile Updated'
                                </Message>
                            )}
                            {loading && <Loader />}
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={user.name}
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder={user.email}
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="confirmpassword">
                                    <Form.Label>
                                        Confirm Your Password
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                        }}
                                    ></Form.Control>
                                </Form.Group>
                                <Button type="submit" variant="primary">
                                    Update my information
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        setEditMenu(false);
                                    }}
                                >
                                    Done Editing
                                </Button>
                            </Form>
                        </div>
                    ) : (
                        ''
                    )}
                    {menu === 'order' ? (
                        <>
                            <h2>My Orders List</h2>
                            {loadingOrder ? (
                                <Loader />
                            ) : errorOrder ? (
                                <Message variant="danger">{errorOrder}</Message>
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
                                                <th>Date</th>
                                                <th>Total</th>
                                                <th>Paid</th>
                                                <th>Delivered</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => (
                                                <tr key={order._id}>
                                                    <td>{order._id}</td>
                                                    <td>
                                                        {order.createdAt.substring(
                                                            0,
                                                            10,
                                                        )}
                                                    </td>
                                                    <td>{order.totalPrice}</td>
                                                    <td>
                                                        {order.isPaid ? (
                                                            order.paidAt.substring(
                                                                0,
                                                                10,
                                                            )
                                                        ) : (
                                                            <i className="fas fa-times"></i>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {order.isDelivered ? (
                                                            order.deliveredAt.substring(
                                                                0,
                                                                10,
                                                            )
                                                        ) : (
                                                            <i className="fas fa-times"></i>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <LinkContainer
                                                            to={`/order/${order._id}`}
                                                        >
                                                            <Button
                                                                className="btn-sm"
                                                                variant="primary"
                                                            >
                                                                Detail
                                                            </Button>
                                                        </LinkContainer>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </>
                            )}
                        </>
                    ) : (
                        ''
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default ProfileScreen;
