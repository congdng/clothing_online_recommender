import React from 'react';
import { Nav } from  'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutStep = (
    {step1, step2, step3, step4, keyHighlight}
) => {
  return (
    <Nav className='justify-content-center mb-4'>
        <Nav.Item>
            {step1
            ?keyHighlight === '1'
            ?(
                <LinkContainer to='/cart'>
                    <Nav.Link>
                        <strong style={{ fontWeight: 600 }}>
                        Cart
                        </strong>
                    </Nav.Link>
                </LinkContainer>
            )
            :(
                <Nav.Link>
                        Cart
                    </Nav.Link>
            )
            :(
                <Nav.Link disabled>
                    Cart
                </Nav.Link>
            )
            } 
        </Nav.Item>
        <Nav.Item>
            {step2
            ?(
                <LinkContainer to='/checkout/shipping'>
                    <Nav.Link>Shipping</Nav.Link>
                </LinkContainer>
            )
            :(
                <Nav.Link disabled>
                    Shipping
                </Nav.Link>
            )
            } 
        </Nav.Item>
        <Nav.Item>
            {step3
            ?(
                <LinkContainer to='/checkout/payment'>
                    <Nav.Link>Payment</Nav.Link>
                </LinkContainer>
            )
            :(
                <Nav.Link disabled>
                    Payment
                </Nav.Link>
            )
            } 
        </Nav.Item>
        <Nav.Item>
            {step4
            ?(
                <LinkContainer to='/checkout/placeorder'>
                    <Nav.Link>Place Order</Nav.Link>
                </LinkContainer>
            )
            :(
                <Nav.Link disabled>
                    Place Order
                </Nav.Link>
            )
            } 
        </Nav.Item>
    </Nav>
  )
}

export default CheckoutStep