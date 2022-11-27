package io.deepstory.exception;

import lombok.Getter;

@Getter
public class ServerErrorRequestException extends RuntimeException{
	
    public ServerErrorRequestException(String message) {
        super(message);
    }
}
