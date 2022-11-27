package io.deepstory.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(BadErrorRequestException.class)
	protected ResponseEntity<ResponseMessage> handleException(BadErrorRequestException e) {
		
		ResponseMessage message = new ResponseMessage("400", HttpStatus.BAD_REQUEST, e.getMessage());

		return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
	}
	
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ResponseMessage> NotFoundException(NoHandlerFoundException e) {

    	ResponseMessage message = new ResponseMessage("404", HttpStatus.NOT_FOUND, "API 요청 URL이 잘못되었습니다.");

            	
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }
	
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ResponseMessage> MethodNotAlloewedException(HttpRequestMethodNotSupportedException e) {
    	
        e.printStackTrace();
        
		ResponseMessage message = new ResponseMessage("405", HttpStatus.METHOD_NOT_ALLOWED, "HTTP 매핑 메서드가 잘못되었습니다. get, post 요청을 확인해주세요. ");

		return new ResponseEntity<>(message, HttpStatus.METHOD_NOT_ALLOWED);

    }
    
	@ExceptionHandler(ServerErrorRequestException.class)
	public ResponseEntity<ResponseMessage> ServerException(ServerErrorRequestException e) {
		
		ResponseMessage message = new ResponseMessage("500", HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage() );
		
		return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
    
	
}
