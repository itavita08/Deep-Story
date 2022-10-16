package io.playdata.lo.jwt;

import java.util.Base64;
import java.util.Date;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.playdata.lo.model.dto.AccountResponse;
import lombok.RequiredArgsConstructor;

/* AccountService를 통해 전달 받은 AccountResponse DTO를 JwtProvider에게 넘겨주어 토큰을 발행
	토큰은 발행 유저 정보, 발행 시간, 유효 시간, 해싱 알고리즘과 키를 설정하여 발행 */

@Component
@RequiredArgsConstructor
public class JwtProvider {

	private final ObjectMapper objectMapper;

	private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30; // 30분
	private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7; // 7일

	@Value("spring.jwt.key")
	private String key;

	@Value("spring.jwt.live.atk")
	private String atkLive;

	@PostConstruct
	protected void init() {
		key = Base64.getEncoder().encodeToString(key.getBytes());
	}

	// 로그인으로 토큰 발급 메소드
	public TokenResponse createTokensByLogin(AccountResponse accountResponse) throws JsonProcessingException {

		// 발행 유저 정보
		Subject atkSubject = Subject.atk(accountResponse.getAccountId(), accountResponse.getEmail(),
				accountResponse.getNickname());

		String atk = createToken(atkSubject, atkLive);

		// 토큰 발급 확인하기 위해 반환. 사실 클라이언트에게 보일 필요 없으니? 추후 수정.
		return new TokenResponse(atk, null);
	}

	private String createToken(Subject subject, String tokenLive) throws JsonProcessingException {

		// 발행 유저 정보
		String subjectStr = objectMapper.writeValueAsString(subject); //json형태로 변환
		Claims claims = Jwts.claims().setSubject(subjectStr);

		// 발행 시간, 유효 시간
		long now = (new Date()).getTime();
		Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME); // 발급 시간 30분으로 설정

		// 해싱 알고리즘과 키
		return Jwts.builder()
				.setClaims(claims)
				.setIssuedAt(new Date(now))
				.setExpiration(accessTokenExpiresIn)
				.signWith(SignatureAlgorithm.HS256, key).compact();
	}
}
