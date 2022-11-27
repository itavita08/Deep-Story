package io.deepstory.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Message {
	
	private HttpStatus status;
	
	private String message;
}
