import { 
    ORDER_CREATE_ACCESS, 
    ORDER_CREATE_FAIL, 
    ORDER_CREATE_REQUEST, 
    ORDER_DELIVER_ACCESS, 
    ORDER_DELIVER_FAIL, 
    ORDER_DELIVER_REQUEST, 
    ORDER_DETAIL_ACCESS, 
    ORDER_DETAIL_FAIL, 
    ORDER_DETAIL_REQUEST, 
    ORDER_LIST_ACCESS, 
    ORDER_LIST_FAIL, 
    ORDER_LIST_REQUEST, 
    ORDER_PAY_ACCESS, 
    ORDER_PAY_FAIL, 
    ORDER_PAY_REQUEST,
    ORDER_USER_ACCESS,
    ORDER_USER_FAIL,
    ORDER_USER_REQUEST
}
from '../constants/orderConstant';
import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
        const { userLogin: {userInfo} } = getState() 
        const config = {
            headers :{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const { data } = await axios.post(
            `/api/orders`,
            order,
            config
        )

        dispatch({
            type: ORDER_CREATE_ACCESS,
            payload: data
        })
    }
    catch (e){
        dispatch({ type: ORDER_CREATE_FAIL, 
            payload: e.response && e.response.data.message
            ? e.response.data.message
            : e.message, })
    }
}

export const getOrderDetail = (id) => async (dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_DETAIL_REQUEST
        })
        const { userLogin: {userInfo} } = getState() 
        const config = {
            headers :{
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const { data } = await axios.get(
            `/api/orders/${id}`,
            config
        )

        dispatch({
            type: ORDER_DETAIL_ACCESS,
            payload: data
        })
    }
    catch (e){
        dispatch({ type: ORDER_DETAIL_FAIL, 
            payload: e.response && e.response.data.message
            ? e.response.data.message
            : e.message, })
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })
        const { userLogin: {userInfo} } = getState() 
        const config = {
            headers :{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const { data } = await axios.put(
            `/api/orders/${orderId}/pay`,
            paymentResult,
            config
        )

        dispatch({
            type: ORDER_PAY_ACCESS,
            payload: data
        })
    }
    catch (e){
        dispatch({ type: ORDER_PAY_FAIL, 
            payload: e.response && e.response.data.message
            ? e.response.data.message
            : e.message, })
    }
}

export const listUserOrders = () => async (dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_USER_REQUEST
        })
        const { userLogin: {userInfo} } = getState() 
        const config = {
            headers :{
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const { data } = await axios.get(
            `/api/orders/myorder`,
            config
        )

        dispatch({
            type: ORDER_USER_ACCESS,
            payload: data
        })
    }
    catch (e){
        dispatch({ type: ORDER_USER_FAIL, 
            payload: e.response && e.response.data.message
            ? e.response.data.message
            : e.message, })
    }
}

export const listOrders = () => async (dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })
        const { userLogin: {userInfo} } = getState() 
        const config = {
            headers :{
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const { data } = await axios.get(
            `/api/orders`,
            config
        )

        dispatch({
            type: ORDER_LIST_ACCESS,
            payload: data
        })
    }
    catch (e){
        dispatch({ type: ORDER_LIST_FAIL, 
            payload: e.response && e.response.data.message
            ? e.response.data.message
            : e.message, })
    }
}
export const deliverOrder = (order) => async (dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST
        })
        const { userLogin: {userInfo} } = getState() 
        const config = {
            headers :{
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const { data } = await axios.put(
            `/api/orders/${order._id}/deliver`,
            {},
            config
        )

        dispatch({
            type: ORDER_DELIVER_ACCESS,
            payload: data
        })
    }
    catch (e){
        dispatch({ type: ORDER_DELIVER_FAIL, 
            payload: e.response && e.response.data.message
            ? e.response.data.message
            : e.message, })
    }
}