import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_ACCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_ACCESS,
    USER_REGISTER_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_ACCESS,
    USER_DETAIL_FAIL,
    USER_UPDATE_ACCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_FAIL,
    USER_DETAIL_RESET,
    USER_ALL_REQUEST,
    USER_ALL_ACCESS,
    USER_ALL_FAIL,
    USER_ALL_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_FAIL,
    USER_DELETE_ACCESS,
    USER_UPDATE_ADMIN_REQUEST,
    USER_UPDATE_ADMIN_ACCESS,
    USER_UPDATE_ADMIN_FAIL,
    USER_UPDATE_ADMIN_RESET
} from '../constants/userConstant'
export const userLoginReducers = (state = { }, action) =>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_ACCESS: 
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducers = (state = { }, action) =>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_ACCESS: 
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userDetailsReducers = (state = { user: {} }, action) =>{
    switch(action.type){
        case USER_DETAIL_REQUEST:
            return { ...state, loading: true };
        case USER_DETAIL_ACCESS: 
            return { loading: false, user: action.payload };
        case USER_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        case USER_DETAIL_RESET:{
            return {user: {}}
        }
        default:
            return state
    }
}

export const userUpdateProfileReducers = (state = { }, action) =>{
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return { loading: true };
        case USER_UPDATE_ACCESS: 
            return { loading: false, success: true, userInfo: action.payload };
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userAllReducers = (state = { users: [] }, action) =>{
    switch(action.type){
        case USER_ALL_REQUEST:
            return { loading: true };
        case USER_ALL_ACCESS: 
            return { loading: false, users: action.payload };
        case USER_ALL_FAIL:
            return { loading: false, error: action.payload }
        case USER_ALL_RESET:
            return {users: []}
        default:
            return state
    }
}

export const userDeleleReducers = (state = {  }, action) =>{
    switch(action.type){
        case USER_DELETE_REQUEST:
            return { loading: true };
        case USER_DELETE_ACCESS: 
            return { loading: false, success:true};
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userUpdateReducers = (state = { user: { } }, action) =>{
    switch(action.type){
        case USER_UPDATE_ADMIN_REQUEST:
            return { loading: true };
        case USER_UPDATE_ADMIN_ACCESS: 
            return { loading: false, success:true};
        case USER_UPDATE_ADMIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_ADMIN_RESET:
            return { user: {}}
        default:
            return state
    }
}