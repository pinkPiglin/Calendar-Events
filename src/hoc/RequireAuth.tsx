import React from 'react';
import { useSelector } from 'react-redux';
import {Navigate, useLocation} from 'react-router-dom';
import { IGlobalState } from '../Components/Calendar/buildDate';

type props={
    children:React.ReactNode
}
const RequireAuth=({children}:props):any=> {
    const gState:IGlobalState = useSelector((state:IGlobalState)=>state);

    const location =  useLocation();
    console.log(location);
    if(!gState.auth.authorized){
       return  <Navigate to='/login' state={{from:location}}/> 
    }
    return children;
}

export default RequireAuth