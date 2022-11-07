package io.deepstory.config;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.deepstory.exception.ResponseMessage;
import lombok.Getter;

/* 토큰 관련 예외에 대한 처리 를 위해. 필터 단계에서 발생한 예외를 처리*/

@Getter
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    public CustomAuthenticationEntryPoint(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        
    	String exceptionMessage = (String) request.getAttribute("exception");
        
    	response.setStatus(HttpStatus.UNAUTHORIZED.value());
        
    	response.setContentType("application/json");
        
    	response.setCharacterEncoding("UTF-8");
        
    	// 401, UNAUTHORIZED
    	ResponseMessage message = new ResponseMessage("400", HttpStatus.UNAUTHORIZED, exceptionMessage);
        
    	String res = this.convertObjectToJson(message);
        
    	response.getWriter().print(res);
    }

    private String convertObjectToJson(Object object) throws JsonProcessingException {
        
    	return object == null ? null : objectMapper.writeValueAsString(object);
    }
}
