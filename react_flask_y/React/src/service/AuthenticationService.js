import axios from 'axios'

import { setCookie, getCookie, deleteCookie } from '../storage/Cookie';


class AuthenticationService {


    // 1. 로그인
    // email, password 서버로 전송
    executeJwtAuthenticationService(accountEmail, accountPassword) {
        return axios.post('http://localhost:8080/auth/login', {
            accountEmail,
            accountPassword
        })
    }


    // 토큰 저장
    // email 을 authenticatedUser로 localStorage에 저장
    registerSuccessfulLoginForJwt(accountEmail, atk, rtk) {


        // 세션 스토리지에 이메일 저장
        sessionStorage.setItem('authenticatedUser', accountEmail);

        // 쿠키에 Refresh Token 저장
        setCookie("RefreshToken", rtk);
        setCookie("AccessToken", atk);
        setCookie("islogin", true)

        this.setupAxiosInterceptors();
    }


    setupAxiosInterceptors() {
          
        // 요청(request) interceptor
        axios.interceptors.request.use(
            // 요청 전에 해야 할 일
            config => {

                const AccessToken = getCookie('AccessToken');

                // token이 있다면 header에 Bearer + token 담아서 보냄
                if (AccessToken && config.url !=='http://localhost:8080/reissue') {

                    config.headers['Authorization'] = 'bearer ' + AccessToken;


                } else if(config.url === 'http://localhost:8080/reissue') {

                    config.headers['Authorization'] = 'bearer ' + getCookie('RefreshToken');

                }

                return config;
            },
            // 오류 요청 을 보내기 전 수행할 일
            error => {
                Promise.reject(error)
            });

          axios.interceptors.response.use(
            (response) => {

                console.log("정상 응답의 config ----------------------")

                console.log(response.config)

                // 정상 응답 내용
              return response;
            },

            async (error) =>  { 

                const originalRequest = error.config;
                
                if (error.response?.status === 401 && error.response?.data.status === "UNAUTHORIZED"){

                        return axios.get('http://localhost:8080/reissue')
                            .then(response => {

                                if (response.status === 200) {

                                    setCookie("AccessToken", response.data.atk);

                                    originalRequest.headers['Authorization'] = `bearer ${response.data.atk}`;

                                    return axios(originalRequest);

                                }
                            })}     
                            
                            if (error.response?.status === 400 ){

                                console.log(error.response)
                            }

                    
                    return Promise.reject(error);
                
                });

            }
            
            
    logout() {

        deleteCookie("AccessToken");
        deleteCookie("RefreshToken");
        deleteCookie("islogin");

    }

    // 로그인 확인
    isUserLoggedIn() {
        const token = getCookie('AccessToken');

        if (token) {
            return true;
        }
        
        return false;
    }

    // 사용자 이메일 반환
    getLoggedInUserName() {
        //let user = sessionStorage.getItem('authenticatedUser')
        let user = sessionStorage.getItem('authenticatedUser');

        if(user===null) return '';

        return user;
    }


    // 3. 회원가입
    signService(accountEmail,  accountName, accountPassword, accountDate, accountGender, ) {

        console.log(accountEmail)

        return axios.post('http://localhost:8080/auth/signUp', {
            accountEmail,
            accountName,
            accountPassword,
            accountDate,
            accountGender
        })
    }
}

export default new AuthenticationService()