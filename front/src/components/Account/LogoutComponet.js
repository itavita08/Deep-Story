import React from 'react';
import AuthenticationService from '../../service/AuthenticationService';

function LogoutComponent() {
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