import React, {useEffect}from 'react';
import { useSelector } from 'react-redux';
import {Navigate, useLocation} from 'react-router-dom';
import { IGlobalState } from '../Components/Calendar/buildDate';
import { AuthProvider } from './AuthProvider';

type props={
    children:React.ReactNode
}
type Storage={
    login:string,
    password:string
}
// const authWithLocalStorage= async()=>{
//     const user = AuthProvider()
//     const storage = JSON.parse(localStorage.getItem('user')!)
//     let result = false;
//     console.log( user.singIn(storage.logIn, storage.password, '/', false, ()=>result=true))

//     await user.singIn(storage.logIn, storage.password, '/', true, ()=>result=true)
//     console.log('result', result)
//     return result
// }
const RequireAuth=({children}:props):any=> {
    const gState:IGlobalState = useSelector((state:IGlobalState)=>state);
    const location =  useLocation();
   
    if(!gState.auth.authorized ){
        return  <Navigate to='/login' state={{from:location}}/> 
    } 
    return children;
}

export default RequireAuth