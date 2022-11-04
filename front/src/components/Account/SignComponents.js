import React, { useState } from 'react';
import AuthenticationService from '../../service/AuthenticationService';
import styled from "styled-components";
import image2 from '../assets/image2.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from "primereact/card";
import image55 from '../assets/image55.jpg';
import "./Signcss.css";

import navigate from 'navigate';
// import navigate from 'navigate';

export default function SignComponets(props) {

    const [state, setState] = useState({
        accountEmail: '',
        accountName: '',
        accountPassword: '',
        accountGender: '',
        accountDate: ''
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const signClicked = () => {

        console.log(state.accountEmail)
        AuthenticationService
            .signService(state.accountEmail, state.accountName, state.accountPassword, state.accountDate, state.accountGender)
            .then((response) => {
                console.log("회원 가입 성공 반환 값 확인")
                console.log(response)
                console.log(response.data.accountEmail)
                alert("회원가입에 성공하였습니다.")
                // navigate('./login')
                window.location.replace('./login');

            }).catch((error) => {

                console.log(error.response)

                
                alert("인증에 실패하였습니다 다시 시도해 주세요.")
                // this.setState({showSuccessMessage:false})
                // this.setState({hasLoginFailed:true})
            })
    }
    function gogo() {
        // navigate('/login')
        window.location.replace('./login');
    }
    return (
        <div className='back'>
        <div className="Auth-form-container">
            <div className="Auth-form-content">
                <div>

                    
                    <div className="container">
                        <div className="form-group mt-32">
                            <Card
                                title="Welcome to Community"
                                className="login-card p-shadow-24"

                                style={{ width: "20.5rem", marginRight: "5em", marginBottom: "1em", fontSize: "3.5vh", fontWeight: "1000" }}
                            ></Card>
                            <label>Email address</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                name="accountEmail"
                                placeholder="Email"
                                value={state.accountEmail}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                name="accountName"
                                placeholder="Name"
                                value={state.accountName}
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
                        <div className="form-group mt-3">
                            <label>Data of birth(YYYY-MM-DD)</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                name="accountDate"
                                placeholder="accountDate"
                                value={state.accountDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Gender</label>
                            <select type="option"
                                    className="form-control mt-1"
                                    name="accountGender"
                                    value={state.accountGender} 
                                    onChange={handleChange}
                                    >
                            <option value="male">male</option>
                            <option value="female">female</option>
                            {/* <input
                                type="text"
                                className="form-control mt-1"
                                name="accountGender"
                                placeholder="Gender"
                                value={state.accountGender}
                                onChange={handleChange}
                            /> */}
                            </select>
                        </div>
                        {/* <div className="container">
                Email: <input type="text" name="accountEmail" value={state.accountEmail} onChange={handleChange}></input> <br></br>
                UserName: <input type="text" name="accountName" value={state.accountName} onChange={handleChange}></input> <br></br>
                Password: <input type="password" name="accountPassword" value={state.accountPassword} onChange={handleChange}></input><br></br>
                Data of birth: <input type="text" name="accountDate" value={state.accountDate} onChange={handleChange}></input><br></br>
                Gender: <input type="text" name="accountGender" value={state.accountGender} onChange={handleChange}></input><br></br> */}

                        {/* <button className="btn btn-success" onClick={signClicked}>Sign up</button> */}
                        <div className="d-grid gap-2 mt-3">
                    <button className="btn btn-primary"
                        onClick={signClicked}>
                        Sign up
                    </button>
                </div>
                <p className="forgot-password text-right mt-2">
                Already have an ccount?<a href='/login'onClick={gogo}>Log in</a>
                </p>
                    </div>
                </div>
            </div>
            <img src={image2} width="auto" height="800" />
        </div>
        </div>
    );

}

