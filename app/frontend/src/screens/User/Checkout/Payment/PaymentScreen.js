import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../../../components/Form/FormContainer';
import CheckoutStep from '../../../../components/CheckoutStep/CheckoutStep';
import { savePaymentMethod } from '../../../../actions/cartActions';

const PaymentScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    const history = useNavigate();
    if (!shippingAddress) {
        history('/checkout/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('Paypal');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history('/checkout/placeorder');
    };
    return (
        <FormContainer>
            <CheckoutStep step1 step2 step3></CheckoutStep>
            <h1>Payment</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="Paypal or Credit Card"
                            id="Paypal"
                            name="paymentMethod"
                            value="Paypal"
                            checked
                            onChange={(e) => {
                                setPaymentMethod(e.target.value);
                            }}
                        ></Form.Check>
                        <Form.Check
                            type="radio"
                            label="Pay on Contact"
                            id="Contact"
                            name="paymentMethod"
                            value="Contact"
                            onClick={(e) => {
                                setPaymentMethod(e.target.value);
                            }}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;
