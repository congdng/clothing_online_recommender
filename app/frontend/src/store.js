import { legacy_createStore as createStore , combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools }from 'redux-devtools-extension';
import { productListReducers, productDetailReducers, productDeleteReducers, productCreateReducers, productUpdateReducers, productReviewReducers, productTopReducers, productTopCategoryReducers } from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'
import { userAllReducers, userDeleleReducers, userDetailsReducers, userLoginReducers, userRegisterReducers, userUpdateProfileReducers, userUpdateReducers } from './reducers/userReducers'
import { orderCreateReducer, orderDeliverReducer, orderDetailReducer, orderListReducer, orderPayReducer, orderUserReducer } from './reducers/orderReducers'
const reducer = combineReducers({
    productList: productListReducers,
    productDetail: productDetailReducers,
    cart: cartReducers,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails: userDetailsReducers,
    userUpdateProfile: userUpdateProfileReducers,
    orderCreate: orderCreateReducer,
    orderDetail: orderDetailReducer,
    orderPay: orderPayReducer,
    orderUser: orderUserReducer,
    userList: userAllReducers,
    userDelete: userDeleleReducers,
    userUpdate: userUpdateReducers,
    productDelete: productDeleteReducers,
    productCreate: productCreateReducers,
    productUpdate: productUpdateReducers,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
    productReview: productReviewReducers,
    productTop: productTopReducers,
    productTopCategory: productTopCategoryReducers,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : ('')

const initialState = {
    cart: { cartItems: cartItemsFromStorage, 
            shippingAddress: shippingAddressFromStorage,
            paymentMethod: paymentMethodFromStorage
        },
    userLogin: { userInfo: userInfoFromStorage }
}
const middleware = [thunk]
const store = createStore (reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store