package io.deepstory.exception;

import lombok.Getter;

@Getter
public class BadErrorRequestException extends RuntimeException{
	
    public BadErrorRequestException(String message) {
        super(message);
    }
}
