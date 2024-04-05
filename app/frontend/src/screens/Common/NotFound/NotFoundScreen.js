import React from 'react';
import { Link } from 'react-router-dom';
import Appbutton from '../../../pieces/Button/Appbutton';
import './NotFoundPage.css';
const NotFoundScreen = () => {
    return (
        <div className="notfoundpage">
            <h1>404 NOT FOUND</h1>
            <Link to="/">
                <Appbutton text="Back To Homepage" />
            </Link>
        </div>
    );
};

export default NotFoundScreen;
