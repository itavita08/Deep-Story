package io.deepstory.exception;

import lombok.Getter;

@Getter
public class SeverErrorRequestException extends RuntimeException{
	
    public SeverErrorRequestException(String message) {
        super(message);
    }
}
