import React from 'react';
import AuthenticationService from '../../service/AuthenticationService';
import { useState } from 'react';
import { useNavigate, useLocation, Outlet } from "react-router-dom";


export default function LoginComponent(props) {


    const [state, setState] = useState({
        accountEmail: '',
        accountPassword: '',
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const navigate = useNavigate();

    const loginClicked = ()  => {

        AuthenticationService
            .executeJwtAuthenticationService(state.accountEmail, state.accountPassword)
            .then((response) => {
            console.log(response.data)
            AuthenticationService.registerSuccessfulLoginForJwt(state.accountEmail, response.data.atk, response.data.rtk)
            
            if(!response.data.atk) {
                console.log('==================',response.data.msg)
                
            } else if(response.data.accountEmail === null){
                console.log('=======================','비밀번호 불일치')
                // alert('비빌번호 불일치')
            } 

            //document.location.href = '/MainPageLogin'
            navigate('/MainPageLogin');

            setState({hasLoginFailed:true})


        }).catch( () =>{
            alert('회원 정보를 확인해주세요.')
            navigate('/');
            
        })
    }


    return (
        <div>
            <h1>Login</h1>
            <div className="container">

                Email: <input type="text" name="accountEmail"  value={state.accountEmail} onChange={handleChange}></input>
                Password: <input type="password" name="accountPassword" value={state.accountPassword} onChange={handleChange}></input>
                
                <button className="btn btn-success" onClick={loginClicked}>Login</button>
            </div>
        </div>
    );
}



