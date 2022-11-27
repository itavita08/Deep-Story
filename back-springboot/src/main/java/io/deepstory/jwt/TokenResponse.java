package io.deepstory.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class TokenResponse {

    private final String atk;

    private final String rtk;
    
    private String type;
    
    public static TokenResponse tokenResponse(String atk, String rtk) {
    	return TokenResponse.builder().atk(atk).rtk(rtk).build();
    
}
}
