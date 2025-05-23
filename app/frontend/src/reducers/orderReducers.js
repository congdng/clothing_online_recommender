import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_ACCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_ACCESS,
    ORDER_DETAIL_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_RESET,
    ORDER_PAY_ACCESS,
    ORDER_PAY_FAIL,
    ORDER_USER_FAIL,
    ORDER_USER_ACCESS,
    ORDER_USER_REQUEST,
    ORDER_USER_RESET,
    ORDER_LIST_REQUEST,
    ORDER_LIST_ACCESS,
    ORDER_LIST_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_ACCESS,
    ORDER_DELIVER_RESET,
    ORDER_DELIVER_FAIL
}
from '../constants/orderConstant'

export const orderCreateReducer = (state = {}, action) =>{
    switch (action.type){
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }
        case ORDER_CREATE_ACCESS:
            return{
                loading: false,
                success: true,
                order: action.payload
            }
        case ORDER_CREATE_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state
        }
}

export const orderDetailReducer = (
    state = {loading: true, orderItems: [], shippingAddress: {}}, 
    action) => {
    switch (action.type){
        case ORDER_DETAIL_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_DETAIL_ACCESS:
            return{
                loading: false,
                order: action.payload
            }
        case ORDER_DETAIL_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state
        }
}

export const orderPayReducer = (
    state = {}, 
    action) => {
    switch (action.type){
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }
        case ORDER_PAY_ACCESS:
            return{
                loading: false,
                success: true,
            }
        case ORDER_PAY_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state
        }
}

export const orderUserReducer = (
    state = { orders: [] }, 
    action) => {
    switch (action.type){
        case ORDER_USER_REQUEST:
            return {
                loading: true
            }
        case ORDER_USER_ACCESS:
            return{
                loading: false,
                orders: action.payload,
            }
        case ORDER_USER_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case ORDER_USER_RESET:
            return {orders: []}
        default:
            return state
        }
}
export const orderListReducer = (
    state = { orders: [] }, 
    action) => {
    switch (action.type){
        case ORDER_LIST_REQUEST:
            return {
                loading: true
            }
        case ORDER_LIST_ACCESS:
            return{
                loading: false,
                orders: action.payload,
            }
        case ORDER_LIST_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state
        }
}
export const orderDeliverReducer = (
    state = {}, 
    action) => {
    switch (action.type){
        case ORDER_DELIVER_REQUEST:
            return {
                loading: true
            }
        case ORDER_DELIVER_ACCESS:
            return{
                loading: false,
                success: true,
            }
        case ORDER_DELIVER_FAIL:
            return{
                loading: false,
                error: action.payload
            }
        case ORDER_DELIVER_RESET:
            return {}
        default:
            return state
        }
}
