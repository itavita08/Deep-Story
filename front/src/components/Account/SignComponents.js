import React, { useState } from "react";
import { Card } from "primereact/card";
import AuthenticationService from "../../service/AuthenticationService";
import image2 from "../assets/image2.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signcss.css";

export default function SignComponets(props) {
  const [state, setState] = useState({
    accountEmail: "",
    accountName: "",
    accountPassword: "",
    accountGender: "",
    accountDate: "",
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const signClicked = () => {
    console.log(state.accountEmail);
    AuthenticationService.signService(
      state.accountEmail,
      state.accountName,
      state.accountPassword,
      state.accountDate,
      state.accountGender
    )
      .then((response) => {
        alert("회원가입에 성공하였습니다.");
        window.location.replace("./login");
      })
      .catch((error) => {
        alert("인증에 실패하였습니다 다시 시도해 주세요.");
      });
  };

  function gogo() {
    window.location.replace("./login");
  }

  return (
    <div className="back">
      <div className="Auth-form-container">
        <div className="Auth-form-content">
          <div>
            <div className="container">
              <div className="form-group mt-32">
                <Card
                  title="Welcome to Community"
                  className="login-card p-shadow-24"
                  style={{
                    width: "20.5rem",
                    marginRight: "5em",
                    marginBottom: "1em",
                    fontSize: "3.5vh",
                    fontWeight: "1000",
                  }}
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
                <select
                  type="option"
                  className="form-control mt-1"
                  name="accountGender"
                  value={state.accountGender}
                  onChange={handleChange}
                >
                  <option value="M">M</option>
                  <option value="F">F</option>
                </select>
              </div>
              <div className="d-grid gap-2 mt-3">
                <button className="btn btn-primary" onClick={signClicked}>
                  Sign up
                </button>
              </div>
              <p className="forgot-password text-right mt-2">
                Already have an ccount?
                <a href="/login" onClick={gogo}>
                  Log in
                </a>
              </p>
            </div>
          </div>
        </div>
        <img src={image2} width="auto" height="800" />
      </div>
    </div>
  );
}
