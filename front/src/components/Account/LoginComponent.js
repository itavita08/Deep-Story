import React from 'react';
import AuthenticationService from '../../service/AuthenticationService';
import { useState } from 'react';
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from "primereact/card";
import image33 from '../assets/image33.jpg';
import image44 from '../assets/image44.jpg';
import "./Logincss.css";
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

    const navigate = useNavigate();

    const loginClicked = () => {

        AuthenticationService
            .executeJwtAuthenticationService(state.accountEmail, state.accountPassword)
            .then((response) => {
                console.log(response.data)
                AuthenticationService.registerSuccessfulLoginForJwt(response.data.atk, response.data.rtk, response.data.type)

                if (!response.data.atk) {
                    console.log('==================', response.data.msg)

                } else if (response.data.accountEmail === null) {
                    console.log('=======================', response.data.msg)
                }

                navigate('/MainPageLogin');

                setState({ hasLoginFailed: true })


            }).catch(() => {
                alert('회원 정보를 확인해주세요.')
                navigate('/');

            })
    }
    function gogogo() {
        navigate('/sign')
    }

    return (
        <div className="Auth-form-container">

            {/* <form className="Auth-form"> */}
            
            <div className="Auth-form-content">
                <h3 className="Auth-form-title">Welcome back</h3>
                <div className="form-group mt-3">
                    <Card
                        title="Login to your account"
                        className="login-card p-shadow-24"
                        
                        style={{ width: "19rem", marginRight: "5em", marginBottom: "1em", fontSize: "3.5vh", fontWeight: "1000" }}
                    ></Card>
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
                Dont have an account?<a href='/sign'onClick={gogogo}>Sign up today</a>
                </p>
                

                {/* Email: <input type="text" name="accountEmail"  value={state.accountEmail} onChange={handleChange}></input>
                Password: <input type="password" name="accountPassword" value={state.accountPassword} onChange={handleChange}></input>
                
                <button className="btn btn-success" onClick={loginClicked}>Login</button> */}
            </div>
            {/* </form> */}
            <img src={image33} width="auto" height="800" />
        </div>
        




    );
}










