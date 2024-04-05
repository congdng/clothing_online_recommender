import React, { useState, useEffect } from 'react'; 
import { Link, useParams, useNavigate} from 'react-router-dom';
import { Button, Col, ListGroup, Image, Card, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../../pieces/Message/Message';
import Loader from '../../../pieces/Loader/Loader';
import { getOrderDetail, payOrder, deliverOrder } from '../../../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../../../constants/orderConstant';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';

const OrderScreen = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const history = useNavigate()
    const orderId = params.id
    const [sdk, setSdk] = useState(false )
    const orderDetail = useSelector( state => state.orderDetail)
    const { order, loading, error } = orderDetail
    const userLogin = useSelector( state => state.userLogin)
    const { userInfo } = userLogin
    const orderPay = useSelector( state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay
    const orderDeliver = useSelector( state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver
    if (!loading) {
        order.itemsPrice =(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)).toFixed(2)
    }
    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
        const addPaypal = async () =>{
            const { data: clientId } = await axios.get(`/api/config/paypal`)
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () =>{
                setSdk(true)
            }
            document.body.appendChild(script)
        }
        if (!order || successPay || successDeliver || order._id !== orderId){
            dispatch({
                type: ORDER_PAY_RESET
            })
            dispatch({
                type: ORDER_DELIVER_RESET
            })
            dispatch(getOrderDetail(orderId))
        }
        else if (!order.isPaid) {
            if(!window.paypal){
                addPaypal()
            }
            else{
                setSdk(true)
            }
        }
    }, [dispatch, order, orderId, successPay, successDeliver]) 
    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }
    const deliverHandler = () =>{
        dispatch(deliverOrder(order))
    }
    return (
        loading
        ? <Loader></Loader>
        : error
        ? <Message variant='danger'>{error}</Message>
        :(
            <>
            <Row>
            <Col md={8}>
                <ListGroup>
                    <ListGroup.Item>
                        <h1>Order {order._id}</h1>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Email: </strong>{' '}
                            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                        </p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}{' '}{order.shippingAddress.postalCode},{' '}{order.shippingAddress.country} 
                        </p>
                        {order.isDelivered
                        ?(
                        <Message variant='success'>
                            Deliver on {order.deliveredAt.substring(0,10)}
                        </Message>
                        )
                        :(
                        <Message variant='danger'>
                        Not Delivered
                        </Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                        </p>
                        {order.isPaid
                        ?(
                        <Message variant='success'>
                            Paid on {order.paidAt.substring(0, 10)}
                        </Message>
                        )
                        :(
                        <Message variant='danger'>
                        Not Paid
                        </Message>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Detail</h2>
                        {order.orderItems.length === 0
                        ? <Message>Empty Order</Message>
                        :(
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index)=>(
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image
                                                src={item.image}
                                                alt={item.name}
                                                fluid rounded>
                                                </Image>
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                            <Col>Items</Col>
                            <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                            <Col>Shipping</Col>
                            <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                            <Col>Tax</Col>
                            <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                            <Col>Total</Col>
                            <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && (
                                    <Loader />
                                )}
                                {!sdk
                                ?(
                                    <Loader />
                                )
                                :(
                                    <PayPalButton
                                    amount = {order.totalPrice}
                                    onSuccess={successPaymentHandler}>
                                    </PayPalButton>
                                )
                                }
                            </ListGroup.Item>
                        )}
                        {loadingDeliver && <Loader/>}
                        {userInfo && userInfo.isAdmin && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button type='button' className='btn btn-lock' onClick={deliverHandler}>
                                    Mark as Delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
            </>
        )
  )
}

export default OrderScreen