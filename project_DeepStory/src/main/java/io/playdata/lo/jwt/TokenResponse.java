package io.playdata.lo.jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TokenResponse {

	// Access Token : 접근에 관여하는 토큰
    private final String atk;

    // Refresh Token : ATK 재발급 에서 사용
    private final String rtk;
    
}
