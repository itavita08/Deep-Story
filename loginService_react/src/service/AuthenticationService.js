
import axios from 'axios'

import { setCookie, getCookie, deleteCookie } from '../storage/Cookie';



//import { SET_TOKEN } from '../store/Auth';

class AuthenticationService {


    // 1. 로그인
    // email, password 서버로 전송
    executeJwtAuthenticationService(accountEmail, accountPassword) {
        return axios.post('http://localhost:8080/account/auth/login', {
            accountEmail,
            accountPassword
        })
    }

    // test
    executeHelloService() {
        console.log("===테스트 확인 용===")
        return axios.get('http://localhost:8080/account/test');        
    }

    // 토큰 저장
    // email 을 authenticatedUser로 localStorage에 저장
    registerSuccessfulLoginForJwt(accountEmail, atk, rtk) {


        console.log("===로컬에 토큰 저장===")
        console.log(atk)
        console.log(rtk)

        // 로컬 스토리지에 이메일 저장
        //localStorage.setItem('authenticatedUser', email);

        // 세션 스토리지에 이메일 저장
        sessionStorage.setItem('authenticatedUser', accountEmail);

        // 쿠키에 Refresh Token 저장
        setCookie("RefreshToken", rtk);
        setCookie("AccessToken", atk);

        setCookie("islogin", true)

        // store 에 Access Token 저장
        //SET_TOKEN(atk);

        //this.setupAxiosInterceptors(this.createJWTToken(token))
        
        //JWTToken을 생성해 setupAxiosInterceptors에 넣기

        // token이 있다면 header에 Bearer + token 담아서 보냄
        // 이후의 모든 Request의 Header에는 Token이 담겨져서 전달됨
        this.setupAxiosInterceptors();
    }

    // Bearer 붙여서 토큰 
    createJWTToken(token) {
        return 'bearer ' + token
    }


    setupAxiosInterceptors() {
 
        // 요청(request) interceptor
        // Axios Interceptors는 모든 Request/Response가 목적지에 도달하기 전에 
        // Request에 원하는 내용을 담아 보내거나 원하는 코드를 실행시킬 수
        // sessionStorage 에 저장된 토큰 확인
        axios.interceptors.request.use(
            // 요청 전에 해야 할 일
            config => {

                const AccessToken = getCookie('AccessToken');

                console.log("확아아인------------------------------------------------")
                // token이 있다면 header에 Bearer + token 담아서 보냄
                if (AccessToken && config.url !=='http://localhost:8080/account/reissue') {
                    
                    console.log("AccesssToken있음" + AccessToken)
                    config.headers['Authorization'] = 'bearer ' + AccessToken;

                } else if(config.url === 'http://localhost:8080/account/reissue') {

                    console.log("리프래시 토큰 요청---------")
                    config.headers['Authorization'] = 'bearer ' + getCookie('RefreshToken');

                }
                // config.headers['Content-Type'] = 'application/json';
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

                // if (error.response.status === 401 && originalRequest.url === 'http://localhost:8080/account/reissue') { 


                //     return Promise.reject(error); 

                //        } 

                console.log("타입 에러 확인용 --------")

                console.log(error.response)
                
                if (error.response?.status === 401 && error.response?.data.status === "UNAUTHORIZED"){
                   
                        console.log("비정상 응답 -- atk 만료");

                        console.log(originalRequest)

                        const RefreshToken = getCookie("RefreshToken");

                        console.log(RefreshToken);

                       //originalRequest.headers['Authorization'] = 'bearer ' + RefreshToken;

                        return axios.get('http://localhost:8080/account/reissue')
                            .then(response => {

                                console.log("응답 확인")

                                console.log(response.status)

                                if (response.status === 200) {

                                    console.log("새로운 atk 로!!!!!!!!!!!!")
                                    
                                    setCookie("AccessToken", response.data.atk);

                                    axios.defaults.headers.common.Authorization = `bearer ${response.data.atk}`;

                                    originalRequest.headers['Authorization'] = `bearer ${response.data.atk}`;

                                    console.log(originalRequest)

                                    return axios(originalRequest);

                                }
                            })}
                            
                    
                    return Promise.reject(error);
                
                });

            }
            
            
    logout() {
        //sessionStorage.removeItem('authenticatedUser');
        sessionStorage.removeItem("authenticatedUser");
        deleteCookie("AccessToken");
        deleteCookie("RefreshToken");
        deleteCookie("islogin");

    }

    // 로그인 확인
    isUserLoggedIn() {
        const token = getCookie('AccessToken');
        console.log("===로그인 한 상태!!==");
        console.log(token);

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

        return axios.post('http://localhost:8080/account/auth/sign-up', {
            accountEmail,
            accountName,
            accountPassword,
            accountDate,
            accountGender
        })
    }
}

export default new AuthenticationService()