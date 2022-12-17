import './loginPage.scss';
import React from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { AuthProvider } from '../../hoc/AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import { IGlobalState } from '../../Components/Calendar/buildDate';
import { AuthState } from '../../Redux/redusers/AuthReducer';
import { onChangeInputLogin, onChangePasswordInput, setIsErrorMessage } from '../../Redux/Actions/actionCreaterAuth';

const LoginPage=()=>{
    const state:AuthState = useSelector((state:IGlobalState)=>state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const context = AuthProvider();

    const fromPage = location.state?.from?.pathname || '/'

    function logIn(event:React.FormEvent){
        dispatch(setIsErrorMessage(true))
        event.preventDefault();
        const form = event.target;
        context.singIn(state.loginPage.inputLogin, state.loginPage.inputPassword, {to:fromPage, replace:true});
    }


    return(
        <form autoComplete='Off'  className='loginForm' onSubmit={(event)=>logIn(event)}>
            <h1>Login</h1>
            <div className='login'>
                {!state.loginPage.validity && state.loginPage.hideErrorMessge ? (<span className='error'>Пароль или логин неверный!</span>):null}
                 <input 
                  type="login" 
                  placeholder='username' 
                  value={state.loginPage.inputLogin}
                  onChange={(e)=>dispatch(onChangeInputLogin(e.target.value))}
                  onFocus={()=>dispatch(setIsErrorMessage(false))} 
                  required/>
            </div>

            <div className='password'>
                <input  
                    onChange={(e)=>dispatch(onChangePasswordInput(e.target.value))}
                    onFocus={()=>dispatch(setIsErrorMessage(false))} 
                    value={state.loginPage.inputPassword}
                    type="password"
                    placeholder='password'  
                    required/> 
            </div>

            <button  type='submit'>Login</button>
        </form>
    )
}

export default LoginPage;