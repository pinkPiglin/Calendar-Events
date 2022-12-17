import './loginPage.scss';
import React from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import { useState } from 'react';

const LoginPage=()=>{
  
    const location = useLocation();
    const context = useAuth();

    const fromPage = location.state?.from?.pathname || '/'
    const navigate = useNavigate();

    function logIn(event){
        setHideErrorMessge(true);
        event.preventDefault();
        const form = event.target;
        context.singIn(form.login.value, form.password.value, navigate(fromPage, {replace:true}));
    }
    const [hideErrorMessge, setHideErrorMessge]= useState(true);


    return(
        <form autoComplete='Off'  className='loginForm' onSubmit={(event)=>logIn(event)}>
            <h1>Login</h1>
            <div className='login'>
                {!context.validity &&  hideErrorMessge ? (<span className='error'>Пароль или логин неверный!</span>):null}
                 <input name='login' type="login" placeholder='username'  onFocus={()=>{setHideErrorMessge(false)}} required/>
            </div>

            <div className='password'>
                <input name='password' type="password"placeholder='password'  required/> 
            </div>

            <button  type='submit'>Login</button>
        </form>
    )
}

export default LoginPage;