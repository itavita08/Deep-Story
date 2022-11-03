import React, { useEffect, useState} from 'react';
import AuthenticationService from '../../service/AuthenticationService';
import { useNavigate } from 'react-router-dom';

function LogoutComponent() {
    const navigate = useNavigate();

    AuthenticationService.logout();

    alert("로그아웃 되었습니다.")

    useEffect(() => {
        navigate('/');
      },[] );
    

  

}
export default LogoutComponent