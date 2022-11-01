import { Cookies } from 'react-cookie';


const cookies = new Cookies();

// Refresh Token을 Cookie에 저장하기 위한 함수

export const setCookie = (name, value, exp = 24) => {
    cookies.set(name, value, {
        path: "/",
        //expires: new Date(Date.now() + exp * 60 * 60), // 하루
    });
    };


// Cookie에 저장된 Refresh Token 값을 갖고 오기 위한 함수.
export const getCookie = (name) => {
    return cookies.get(name);
  };

//  Cookie 삭제를 위한 함수. 로그아웃
  export const deleteCookie = (name) => {
    return cookies.remove(name,{ path: '/' });
  };