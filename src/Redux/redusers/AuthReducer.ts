import { ASSIGN_VALIDITY, ON_CHANGE_LOGIN_VALUE, ON_CHANGE_PASSWORD_VALUE, SET_IS_ERROR_MESSAGE, SING_IN } from "../Actions/actionTypes"


export interface IUser{
    id:string
    name:string,
}

// const defaultUser:IUser={
//     id:'63b7e8b4a4311ce01f6c474f',
//     login:"admin",
//     password:'admin',
//     name:'Administrator'

// }
export interface AuthState{
    authorized: boolean
    user?:IUser
    loginPage:{
        validity: boolean
        inputLogin:string
        inputPassword:string
        hideErrorMessge: boolean
    }
}

const initialState:AuthState = {
    authorized: false,
    loginPage:{
        validity: true,
        inputLogin:'',
        inputPassword: '',
        hideErrorMessge:true
    }
}


export const AuthReducer =(state:AuthState = initialState, actions:any):AuthState=>{
    switch(actions.type){
        case SING_IN:
            return{...state, authorized:true, user:actions.newUser, loginPage:{hideErrorMessge:true, validity:true, inputLogin:'', inputPassword:''} }
        case ASSIGN_VALIDITY:
            return{...state, loginPage:{...state.loginPage,validity:actions.newValidity } }
        case ON_CHANGE_LOGIN_VALUE:
            return{...state, loginPage:{...state.loginPage, inputLogin: actions.newValue}}
        case ON_CHANGE_PASSWORD_VALUE:
            return{...state, loginPage:{...state.loginPage, inputPassword: actions.newValue}}
        case SET_IS_ERROR_MESSAGE:
            return{...state, loginPage:{...state.loginPage, hideErrorMessge:actions.value}}
        default:
            return state
    }
}