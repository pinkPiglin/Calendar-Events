import { useDispatch, useSelector } from "react-redux";
import { assignValidity, authUser, exitUser} from "../Redux/Actions/actionCreaterAuth";
import {  useNavigate } from "react-router-dom";


export const AuthProvider =()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users=[
        {
            login:'admin',
            password:'admin', 
            name:'Administrator'
        },
        {
            login:'login',
            password:'password',
            name:'User123'
        }
    ]

    type NavProps = {
        to:string,
        replace:boolean
    }

    function singIn(loginValue:string, passwordValue:string, {to, replace}:NavProps){
        for(let i=0; i<users.length &&  i!==1000; i++){
            let user = users[i];
            if(user.login===loginValue && user.password=== passwordValue){
                dispatch(authUser(user))
                i=1000;
                navigate(to, {replace:replace})
            }
            else{
                dispatch(assignValidity(false))
            }
        }
    }

    function singOut(){
        dispatch(exitUser())
    }
    return({singIn, singOut})
}


