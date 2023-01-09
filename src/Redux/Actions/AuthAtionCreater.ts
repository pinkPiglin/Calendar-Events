import { IUser } from "../redusers/AuthReducer";
import { ASSIGN_VALIDITY, ON_CHANGE_LOGIN_VALUE, ON_CHANGE_PASSWORD_VALUE, SET_IS_ERROR_MESSAGE, SING_IN, SING_OUT } from "./actionTypes";

export function authUser(user:IUser){
    return{
        type:SING_IN,
        newUser:user
    }
}
export function exitUser(){
    return{
        type:SING_OUT
    }
}
export function assignValidity(validity:boolean){
    return{
        type:ASSIGN_VALIDITY,
        newValidity:validity
    }
}
export function setIsErrorMessage(value:boolean){
    return{
        type:SET_IS_ERROR_MESSAGE,
        value
    }
}
export function onChangeInputLogin(value:string){
    return{
        type:ON_CHANGE_LOGIN_VALUE,
        newValue:value
    }
}
export function onChangePasswordInput(value:string){
    return{
        type:ON_CHANGE_PASSWORD_VALUE,
        newValue:value
    }
}