import React, { useEffect } from 'react';
import AuthenticationService from '../../service/AuthenticationService';
import { useNavigate } from 'react-router-dom';

function LogoutComponent() {
    const navigate = useNavigate();

    AuthenticationService.logout();

    alert("로그아웃 되었습니다.")

    useEffect(() => {
        navigate('/');
      },[] );
    AuthenticationService.logout();
    return (
        <>
            <h1>You are logged out</h1>
            <div className="container">
                Thank You for Using Our Application.
                </div>
        </>
    )

}
export default LogoutComponent