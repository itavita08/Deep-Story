package io.playdata.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CorsController {

//	non cors header
//	localhost:8080 서버로 직접 요청합니다.
//	CORS 정책 위반에 대한 에러 메세지가 출력됩니다.
//	axios 모듈의 catch 부분에서 에러 메세지를 화면에 출력합니다.
	
	
//	cors header
//	localhost:8080 서버로 직접 요청합니다.
//	서버로부터 전달받은 데이터를 정상적으로 화면에 출력합니다.
	
	
//	nonProxy
//	localhost:3000 리액트 어플리케이션으로 요청합니다.
//	/not-proxy 경로에 해당하는 프록시 설정이 존재하지 않습니다.
//	localhost:3000 호스트에는 /not-proxy 요청을 받아줄 경로가 없으므로 404 NOT FOUND 에러가 발생합니다.

	
//	proxy
//	localhost:3000 리액트 어플리케이션으로 요청합니다.
//	/proxy 경로에 해당하는 프록시 설정이 존재합니다.
//	http://localhost:8080 호스트 서버로부터 전달받은 데이터를 정상적으로 화면에 출력합니다.
//	
    @GetMapping(value = {"", "/"})
    public String index() {
        System.out.println("index");
        return "index";
    }

    @GetMapping(value = "/not-cors")
    public String notCors() {
        System.out.println("not-cors");
        return "notCors";
    }

    @CrossOrigin("http://localhost:3000")
    @GetMapping(value = "/cors")
    public String cors() {
        System.out.println("cors");
        return "cors";
    }

    @GetMapping(value = "/not-proxy")
    public String notProxy() {
        System.out.println("not-proxy");
        return "notProxy";
    }

    @GetMapping(value = "/proxy")
    public String proxy() {
        System.out.println("proxy");
        return "proxy";
    }
}