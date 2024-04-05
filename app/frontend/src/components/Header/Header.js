import React, { useState } from 'react';
import Appbutton from '../../pieces/Button/Appbutton';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { logout } from '../../actions/userActions';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SearchBox from '../SearchBox/SearchBox';

const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const [search, setSearch] = useState(false);
    const { userInfo } = userLogin;
    const logoutHandler = () => {
        dispatch(logout());
    };
    return (
        <div className="product_header">
            <div className="header_social">
                <div className="grid">
                    <i className="fa-brands fa-facebook"></i>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-youtube"></i>
                </div>
            </div>
            <div className="header_menu">
                <div className="grid header_menu_direction">
                    <div className="flex_display header_webname">
                        <LinkContainer to="/" style={{ cursor: 'pointer' }}>
                            <h3>CODUO</h3>
                        </LinkContainer>
                    </div>
                    <div className="flex_display header_link">
                        <LinkContainer to="/" style={{ cursor: 'pointer' }}>
                            <span>home</span>
                        </LinkContainer>
                        <LinkContainer to="/shop" style={{ cursor: 'pointer' }}>
                            <span>product</span>
                        </LinkContainer>
                        <a
                            // href="https://localhost:8501/"
                            href="http://10.238.18.89:8501"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="header_search"
                        >
                            image search
                        </a>
                        <LinkContainer
                            to="/contact"
                            style={{ cursor: 'pointer' }}
                        >
                            <span>contact</span>
                        </LinkContainer>
                        <LinkContainer
                            to="/aboutus"
                            style={{ cursor: 'pointer' }}
                        >
                            <span>about us</span>
                        </LinkContainer>
                    </div>
                    <div className="flex_display header_user">
                        <i
                            className="fa-solid fa-magnifying-glass"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setSearch(!search);
                            }}
                        ></i>
                        <i className="fa-regular fa-heart"></i>
                        <LinkContainer to="/cart">
                            <i className="fa-solid fa-cart-plus"></i>
                        </LinkContainer>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id="username">
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/">
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to="/login">
                                <Button>JOIN US</Button>
                            </LinkContainer>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title="admin" id="adminmenu">
                                <LinkContainer to="/admin/userlist">
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/productlist">
                                    <NavDropdown.Item>
                                        Products
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/orderlist">
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                    </div>
                </div>
                {search && <SearchBox />}
            </div>
        </div>
    );
};

export default Header;
