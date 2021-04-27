import React from 'react'
import { LoginLayout } from './style'
import logo from '../assets/img/reactlogo.png';
import { useState } from 'react';
import loginFetch from '../store/fetches/login_fetch';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../store/actions';
import axpoReducer from '../store/reducers/axpoReducer';
import { useHistory } from 'react-router';

const LoginPage = () => {
    const token = useSelector(state => state.axpoReducer.token);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleEmail = (event) => {
        const { value } = event.target;
        setEmail(value);
    };

    const handlePassword = (event) => {
        const { value } = event.target;
        setPassword(value);
    };

    const loginHandler = (e) => {
        e.preventDefault();
        loginFetch(email, password, history, dispatch, setToken);
    };
    
    return (
        <LoginLayout>
            <img src={logo} alt="" id="loginLogo"/>
            <form id="loginForm" onSubmit={loginHandler}>
                <h1>Login</h1>
                <div className="input-group">
                    <label htmlFor="email">E-Mail</label>
                    <input type="email" name="email" value={email} onChange={handleEmail}/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={handlePassword}/>
                </div>
                <button type="submit">Login</button>
            </form>
        </LoginLayout>
    )
}

export default LoginPage;
