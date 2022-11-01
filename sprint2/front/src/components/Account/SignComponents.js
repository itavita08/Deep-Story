import React, { useState } from 'react';
import AuthenticationService from '../../service/AuthenticationService';



export default function SignComponets(props) {

    const [state, setState] = useState({
        accountEmail: '',
        accountName:'',
        accountPassword: '',
        accountGender:'',
        accountDate:''
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const signClicked = ()  => {

        console.log(state.accountEmail)
        AuthenticationService
            .signService(state.accountEmail, state.accountName, state.accountPassword, state.accountDate, state.accountGender)
            .then((response) => {
            console.log("회원 가입 성공 반환 값 확인")
            console.log(response)
            console.log(response.data.accountEmail)
        }).catch( () =>{

            alert("인증에 실패하였습니다 다시 시도해 주세요.")
            // this.setState({showSuccessMessage:false})
            // this.setState({hasLoginFailed:true})
        })
    }

    return (
        <div>
            <h1>Sign</h1>
            <div className="container">
                
                Email: <input type="text" name="accountEmail" value={state.accountEmail} onChange={handleChange}></input> <br></br>
                UserName: <input type="text" name="accountName" value={state.accountName} onChange={handleChange}></input> <br></br>
                Password: <input type="password" name="accountPassword" value={state.accountPassword} onChange={handleChange}></input><br></br>
                Data of birth: <input type="text" name="accountDate" value={state.accountDate} onChange={handleChange}></input><br></br>
                Gender: <input type="text" name="accountGender" value={state.accountGender} onChange={handleChange}></input><br></br>

                <button className="btn btn-success" onClick={signClicked}>Login</button>
            </div>
        </div>
    );

}

