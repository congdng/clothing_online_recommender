import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../../../components/Form/FormContainer';
import CheckoutStep from '../../../../components/CheckoutStep/CheckoutStep';
import { saveShippingAddress } from '../../../../actions/cartActions';

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    const history = useNavigate();
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveShippingAddress({
                address,
                city,
                postalCode,
                country,
            }),
        );
        history('/checkout/payment');
    };
    return (
        <FormContainer>
            <CheckoutStep step1 step2 keyHighlight={'1'}></CheckoutStep>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="123 Nossthan Street"
                        value={address}
                        required
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="London"
                        value={city}
                        required
                        onChange={(e) => {
                            setCity(e.target.value);
                        }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="123456789"
                        value={postalCode}
                        required
                        onChange={(e) => {
                            setPostalCode(e.target.value);
                        }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="123 Nossthan Street"
                        value={country}
                        required
                        onChange={(e) => {
                            setCountry(e.target.value);
                        }}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;
