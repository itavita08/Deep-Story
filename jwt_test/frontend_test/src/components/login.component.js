import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Search_id, Search_pw } from "../inc";
import { back_and_close } from "../inc";

import AuthService from "../services/auth.service";

import { withRouter } from '../common/with-router';
import search_id from "../inc/search_id";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
      search_id_modal : false,
      search_pw_modal : false
      
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.router.navigate("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  _openSearchModal = function(target) {

    if(target === 'username') {
      this.setState({ search_id_modal : true })

    } else if(target === 'password') {
      this.setState({ search_pw_modal : true })
    }

      return this.props._toggleModal(false)
   }
   _closeSearchModal = (target) => {
    if(target === 'username') {
      this.setState({ search_id_modal : false })

    } else if(target === 'password') {
      this.setState({ search_pw_modal : false })
    }
 }

 _backSearchModal = (target) => {

  this._closeSearchModal(target)
  return this.props._toggleModal(true)
}


  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="username">아이디</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>로그인</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
          
          <div className='search_user_info_div'>
          <div> <b style={{ 'marginLeft' : '15px' }}
                onClick={() => this._openSearchModal('username')}> 아이디 찾기 </b> </div>
          <div> <b onClick={() => this._openSearchModal('password')}> 비밀번호 찾기 </b> </div>
        </div>
        </div>
        <Search_id 
          search_id_modal = {this.state.search_id_modal}
          _closeSearchModal = {this._closeSearchModal}
          target = "username"
/>
        <Search_pw 
          search_pw_modal = {this.state.search_pw_modal}
          _closeSearchModal = {this._closeSearchModal}
          target = "password"
/>
        </div>
        
      
    );
  }
}

export default withRouter(Login);