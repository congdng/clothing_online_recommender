import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../../pieces/Message/Message';
import Loader from '../../../pieces/Loader/Loader';
import { register } from '../../../actions/userActions';

const RegisterScreen = () => {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState(null);
    const [securityCode, setSecurityCode] = useState();
    const [securityKey, setSecurityKey] = useState(getRandomInt(1000, 9999));
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useNavigate();
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;
    const redirect = location.search ? location.search.split('=')[1] : '/';
    useEffect(() => {
        if (userInfo) {
            history(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Password are not matched');
        } else if (securityCode != securityKey) {
            setMessage('Wrong security code');
        } else {
            dispatch(register(name, email, password));
        }
    };
    return (
        <div className="grid">
            <div className="authorize">
                <div className="wrapper">
                    <div className="authorize--input">
                        <div className="heading">
                            <h2>Login</h2>
                            {error && (
                                <Message variant="danger">{error}</Message>
                            )}
                            {loading && <Loader />}
                            {message && (
                                <Message variant="danger">{message}</Message>
                            )}
                            <span>
                                Already Have An Account?{' '}
                                <Link
                                    to={
                                        redirect
                                            ? `/login?redirect=${redirect}`
                                            : '/login'
                                    }
                                >
                                    Login here{' '}
                                </Link>
                            </span>
                        </div>
                        <div className="authorize--form">
                            <form onSubmit={submitHandler} className="form">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <input
                                            type="text"
                                            placeholder="Input your name"
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                        />
                                        <input
                                            type="email"
                                            placeholder="Input Your Email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }}
                                        />
                                        <input
                                            type="password"
                                            placeholder="Input your password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }}
                                        />
                                        <input
                                            type="password"
                                            placeholder="Confirm your password"
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                setConfirmPassword(
                                                    e.target.value,
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="security">
                                    <input
                                        type="text"
                                        placeholder="Security code"
                                        value={securityCode}
                                        onChange={(e) => {
                                            setSecurityCode(e.target.value);
                                        }}
                                    />
                                    <span>
                                        <b className="text1">
                                            {(securityKey -
                                                (securityKey % 1000)) /
                                                1000}
                                        </b>
                                        <b className="text2">
                                            {((securityKey -
                                                (securityKey % 100)) /
                                                100) %
                                                10}
                                        </b>
                                        <b className="text3">
                                            {(((securityKey -
                                                (securityKey % 10)) /
                                                10) %
                                                100) %
                                                10}
                                        </b>
                                        <b className="text4">
                                            {securityKey % 10}
                                        </b>
                                    </span>
                                </div>
                                <div className="right--footer">
                                    <div className="remember">
                                        <input type="checkbox" />
                                        <span>Remember me</span>
                                    </div>
                                    <a href="../page/forgotpassword.html">
                                        Forgot password
                                    </a>
                                </div>
                                <div className="button">
                                    <button className="btn">
                                        <span>Register</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;
