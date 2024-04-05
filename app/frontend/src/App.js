import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/Common/Home/HomeScreen';
import NotFoundScreen from './screens/Common/NotFound/NotFoundScreen';
import ShopScreen from './screens/Common/Shop/ShopScreen';
import ProductScreen from './screens/Common/Product/ProductScreen';
import CartScreen from './screens/User/Cart/CartScreen';
import LoginScreen from './screens/Common/Login/LoginScreen';
import RegisterScreen from './screens/Common/Register/RegisterScreen';
import ProfileScreen from './screens/User/Profile/ProfileScreen';
import CheckoutScreen from './screens/User/Checkout/CheckoutScreen';
import ShippingScreen from './screens/User/Checkout/Shipping/ShippingScreen';
import PaymentScreen from './screens/User/Checkout/Payment/PaymentScreen';
import PlaceOrderScreen from './screens/User/Checkout/PlaceOrder/PlaceOrderScreen';
import OrderScreen from './screens/User/Order/OrderScreen';
import AdminHomeScreen from './screens/Admin/Home/AdminHomeScreen';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AdminUserListScreen from './screens/Admin/user/AdminUserList/AdminUserListScreen';
import AdminUserEditScreen from './screens/Admin/user/AdminUserEdit/AdminUserEditScreen';
import AdminProductListScreen from './screens/Admin/product/AdminProductList/AdminProductListScreen';
import AdminProductEditScreen from './screens/Admin/product/AdminProductEdit/AdminProductEditScreen';
import AdminOrderListScreen from './screens/Admin/order/AdminOrderList/AdminOrderListScreen';

import { createBrowserHistory } from 'history';

const history = createBrowserHistory({ basename: '/clothing-online-recommender' });

const App = () => {
    return (
        <Router basename="/clothing-online-recommender" history={history}>
            <Header />
            <main>
                <Routes>
                    <Route path="*" element={<NotFoundScreen />}></Route>
                    <Route path="/" element={<HomeScreen />}></Route>
                    <Route path="/shop" element={<ShopScreen />}>
                        <Route
                            path="search/:keyword"
                            element={<ShopScreen />}
                        ></Route>
                        <Route
                            path="page/:pageNumber"
                            element={<ShopScreen />}
                        ></Route>
                        <Route
                            path="search/:keyword/page/:pageNumber"
                            element={<ShopScreen />}
                        />
                    </Route>
                    <Route
                        path="/product/:id"
                        element={<ProductScreen />}
                    ></Route>
                    <Route path="/cart" element={<CartScreen />}></Route>
                    <Route path="/cart/:id" element={<CartScreen />}></Route>
                    <Route path="/login" element={<LoginScreen />}></Route>
                    <Route
                        path="/register"
                        element={<RegisterScreen />}
                    ></Route>
                    <Route path="/profile" element={<ProfileScreen />}></Route>
                    <Route path="/checkout" element={<CheckoutScreen />}>
                        <Route
                            path="shipping"
                            element={<ShippingScreen />}
                        ></Route>
                        <Route
                            path="payment"
                            element={<PaymentScreen />}
                        ></Route>
                        <Route
                            path="placeorder"
                            element={<PlaceOrderScreen />}
                        ></Route>
                    </Route>
                    <Route path="/order/:id" element={<OrderScreen />}></Route>
                    <Route path="/admin" element={<AdminHomeScreen />}></Route>
                    <Route
                        path="/admin/userlist"
                        element={<AdminUserListScreen />}
                    >
                        <Route
                            path="search/:keyword"
                            element={<AdminUserListScreen />}
                        ></Route>
                        <Route
                            path="page/:pageNumber"
                            element={<AdminUserListScreen />}
                        ></Route>
                        <Route
                            path="search/:keyword/page/:pageNumber"
                            element={<AdminUserListScreen />}
                        />
                    </Route>
                    <Route
                        path="/admin/user/:id/edit"
                        element={<AdminUserEditScreen />}
                    ></Route>
                    <Route
                        path="/admin/productlist"
                        element={<AdminProductListScreen />}
                    >
                        <Route
                            path="search/:keyword"
                            element={<AdminProductListScreen />}
                        ></Route>
                        <Route
                            path="page/:pageNumber"
                            element={<AdminProductListScreen />}
                        ></Route>
                        <Route
                            path="search/:keyword/page/:pageNumber"
                            element={<AdminProductListScreen />}
                        />
                    </Route>
                    <Route
                        path="/admin/product/:id/edit"
                        element={<AdminProductEditScreen />}
                    ></Route>
                    <Route
                        path="/admin/orderlist"
                        element={<AdminOrderListScreen />}
                    ></Route>
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
