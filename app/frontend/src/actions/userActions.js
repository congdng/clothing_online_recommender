import { USER_LOGIN_ACCESS, 
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_ACCESS,
    USER_REGISTER_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_ACCESS,
    USER_DETAIL_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_ACCESS,
    USER_UPDATE_FAIL,
    USER_DETAIL_RESET,
    USER_ALL_REQUEST,
    USER_ALL_ACCESS,
    USER_ALL_FAIL,
    USER_ALL_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_ACCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_ADMIN_REQUEST,
    USER_UPDATE_ADMIN_ACCESS,
    USER_UPDATE_ADMIN_FAIL,
} from "../constants/userConstant";
import axios from 'axios';
import { ORDER_USER_RESET } from "../constants/orderConstant";

export const login = (email, password) => async (dispatch) =>{
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers :{
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            'api/users/login', 
            {email, password},
            config)

        dispatch({
            type: USER_LOGIN_ACCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch (e){
        console.log(e)
        dispatch({ type: USER_LOGIN_FAIL, 
            payload: e.response && e.response.data.message
            ? e.response.data.message
            : e.message, })
    }
}

export const logout = () => async (dispatch) =>{
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type: USER_DETAIL_RESET
    })
    dispatch({
        type: ORDER_USER_RESET
    })
    dispatch({
        type: USER_ALL_RESET
    })
}

export const register = ( name, email, password) => async (dispatch) =>{
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const config = {
            headers :{
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users', 
            {name, email, password},
            config)

        dispatch({
            type: USER_REGISTER_ACCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_ACCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch (e){
        dispatch({ type: USER_REGISTER_FAIL, 
            payload: e.response && e.response.data.message
            ? e.response.data.message
            : e.message, })
    }
}

export const getuserDetails = (id) => async (dispatch, getState) =>{
    try {
        dispatch({
            type: USER_DETAIL_REQUEST
        })
        const { userLogin: {userInfo} } = getState() 
        const config = {
            headers :{
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const { data } = await axios.get(
            `/api/users/${id}`,
            config
        )

        dispatch({
            type: USER_DETAIL_ACCESS,
            payload: data
        })
    }
    catch (e){
        dispatch({ type: USER_DETAIL_FAIL, 
            payload: e.response && e.response.data.message
            ? e.response.data.message
            : e.message, })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) =>{
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })
        const { userLogin: {userInfo} } = getState() 
        const config = {
            headers :{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const { data } = await axios.put(
            `/api/users/profile`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_ACCESS,
            payload: data
        })
    }
    catch (e){
        dispatch({ type: USER_UPDATE_FAIL, 
            payload: e.response && e.response.data.message
            ? e.response.data.message
            : e.message, })
    }
}

export const listUsers = () => async (dispatch, getState) =>{
    try {
        dispatch({
            type: USER_ALL_REQUEST
        })
        const { userLogin: {userInfo} } = getState() 
        const config = {
            headers :{
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const { data } = await axios.get(
            `/api/users`,
            config
        )

        dispatch({
            type: USER_ALL_ACCESS,
            payload: data
        })
    }
    catch (e){
        dispatch({ type: USER_ALL_FAIL, 
            payload: e.response && e.response.data.message
            ? e.response.data.message
            : e.message, })
    }
}

export const deleteUser = (id) => async (dispatch, getState) =>{
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })
        const { userLogin: {userInfo} } = getState() 
        const config = {
            headers :{
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const { data } = await axios.delete(
            `/api/users/${id}`,
            config
        )

        dispatch({
            type: USER_DELETE_ACCESS
        })
    }
    catch (e){
        dispatch({ type: USER_DELETE_FAIL, 
            payload: e.response && e.response.data.message
            ? e.response.data.message
            : e.message, })
    }
}

export const updateUser = (user) => async (dispatch, getState) =>{
    try {
        dispatch({
            type: USER_UPDATE_ADMIN_REQUEST
        })
        const { userLogin: {userInfo} } = getState() 
        const config = {
            headers :{
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}` 
            }
        }

        const { data } = await axios.put(
            `/api/users/${user._id}`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_ADMIN_ACCESS
        })
        dispatch({
            type: USER_DETAIL_ACCESS,
            payload: data
        })
    }
    catch (e){
        dispatch({ type: USER_UPDATE_ADMIN_FAIL, 
            payload: e.response && e.response.data.message
            ? e.response.data.message
            : e.message, })
    }
}