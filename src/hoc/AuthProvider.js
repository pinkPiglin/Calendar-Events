import { useDispatch, useSelector } from "react-redux";
import { assignValidity, authUser, exitUser} from "../Redux/Actions/AuthAtionCreater";
import {  useNavigate } from "react-router-dom";
import { fetchEvents } from "../Redux/Actions/EventsActionCreater";
import {authOnServer, GetAllEvents} from '../Redux/Actions/AsyncActions'



export const AuthProvider = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function singIn(loginValue, passwordValue, to, replace){
        if(!loginValue || !passwordValue){
            return
        }
        let user;
        await dispatch(authOnServer(loginValue, passwordValue, (obj)=>user = obj));
        if(user){
            await localStorage.setItem('user', await JSON.stringify(user));
            await dispatch(await GetAllEvents(user.id))
            navigate(to, {replace})
        } 
    }
    function singOut(){
        dispatch(exitUser())
    }
    return({singIn, singOut})
}


