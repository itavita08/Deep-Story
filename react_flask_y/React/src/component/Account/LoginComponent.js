import React from 'react';
import AuthenticationService from '../../service/AuthenticationService';
import { useState } from 'react';
import { useNavigate, useLocation, Outlet } from "react-router-dom";


export default function LoginComponent(props) {


    const [state, setState] = useState({
        accountEmail: '',
        accountPassword: '',
        hasLoginFailed: false,
        showSuccessValue: false
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const loginClicked = ()  => {

        AuthenticationService
            .executeJwtAuthenticationService(state.accountEmail, state.accountPassword)
            .then((response) => {
            console.log(response)
            AuthenticationService.registerSuccessfulLoginForJwt(state.accountEmail, response.data.atk, response.data.rtk)
            console.log("성공")

            setState({hasLoginFailed:true})

            //document.location.href = './Home'

            //this.props.history.push(`/`) // 웰컴 페이지 추후 활용
            //this.props.history.push(`/WelcomeComponets/${state.email}`) // 웰컴 페이지 추후 활용

        }).catch( () =>{
            setState({showSuccessMessage:true})
            setState({hasLoginFailed:false})
        })
    }


    return (
        <div>
            <h1>Login</h1>
            <div className="container">

                {state.showSuccessMessage && <div>Login successful</div>} 
                
                {state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}

                Email: <input type="text" name="accountEmail"  value={state.accountEmail} onChange={handleChange}></input>
                Password: <input type="password" name="accountPassword" value={state.accountPassword} onChange={handleChange}></input>
                
                <button className="btn btn-success" onClick={loginClicked}>Login</button>
            </div>
        </div>
    );
}