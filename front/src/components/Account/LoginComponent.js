import React from 'react';
import AuthenticationService from '../../service/AuthenticationService';
import { useState } from 'react';
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginComponent(props) {

    
    const [state, setState] = useState({
        accountEmail: '',
        accountPassword: ''
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const loginClicked = () => {

        AuthenticationService
            .executeJwtAuthenticationService(state.accountEmail, state.accountPassword)
            .then((response) => {
                console.log(response)
                AuthenticationService.registerSuccessfulLoginForJwt(state.accountEmail, response.data.atk, response.data.rtk)
                if (response.data.accountEmail === undefined) {
                    console.log('', response.data.msg)
                    // alert('아이디 불일치')
                } else if (response.data.accountEmail === null) {
                    console.log('=======================', '비밀번호 불일치')
                    // alert('비빌번호 불일치')
                }
                document.location.href = '/MainPageLogin'
                // this.props.history.push("/MainPageLogin");
                setState({ hasLoginFailed: true })




            }).catch(() => {
                setState({ showSuccessMessage: true })
                setState({ hasLoginFailed: false })
            })
    }
    

    return (
        <div className="Auth-form-container">
        {/* <form className="Auth-form"> */}
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
            <label>Email address</label>
            <input
                type="text"
                className="form-control mt-1"
                name="accountEmail"
                placeholder='Email'
                value={state.accountEmail}
                onChange={handleChange}
            />
            </div>
            <div className="form-group mt-3">
            <label>Password</label>
            <input
                type="password"
                className="form-control mt-1"
                name="accountPassword"
                placeholder="Password"
                value={state.accountPassword}
                onChange={handleChange}
            />
            </div>
            <div className="d-grid gap-2 mt-3">
                <button className="btn btn-primary"
                    onClick={loginClicked}>
                        Sign in
                </button>
            </div>
            <p className="forgot-password text-right mt-2">
                any <a href='/sign'>signin</a>
            </p>
                {/* Email: <input type="text" name="accountEmail"  value={state.accountEmail} onChange={handleChange}></input>
                Password: <input type="password" name="accountPassword" value={state.accountPassword} onChange={handleChange}></input>
                
                <button className="btn btn-success" onClick={loginClicked}>Login</button> */}
            </div>
            {/* </form> */}
            </div>
            

         
        
    );
}



