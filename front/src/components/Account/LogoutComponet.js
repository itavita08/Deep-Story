import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../service/AuthenticationService";

function LogoutComponent() {
  const navigate = useNavigate();

  AuthenticationService.logout();

  alert("로그아웃 되었습니다.");

  useEffect(() => {
    navigate("/");
  }, []);
}

export default LogoutComponent;
