import { ASSIGN_VALIDITY, ON_CHANGE_LOGIN_VALUE, ON_CHANGE_PASSWORD_VALUE, SET_IS_ERROR_MESSAGE, SING_IN } from "../Actions/actionsTypesAuth"


export interface IUser{
    name:string,
    login:string
    password:string
}

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