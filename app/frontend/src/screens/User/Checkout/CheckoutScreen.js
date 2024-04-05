import React from 'react';
import { Outlet } from 'react-router-dom';

const CheckoutScreen = () => {
    return (
        <>
            <div>CheckoutScreen</div>
            <Outlet />
        </>
    );
};

export default CheckoutScreen;
