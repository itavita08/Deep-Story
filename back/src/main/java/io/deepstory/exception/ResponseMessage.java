package io.deepstory.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseMessage {

	private String statusCode;
	
	private HttpStatus status;
	
	private String message;
}
