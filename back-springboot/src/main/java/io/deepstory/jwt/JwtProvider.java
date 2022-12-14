package io.deepstory.jwt;

import java.time.Duration;
import java.util.Base64;
import java.util.Date;
import java.util.Objects;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.deepstory.common.RedisDao;
import io.deepstory.exception.ForbiddenException;
import io.deepstory.model.dto.AccountDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

/* AccountService를 통해 전달 받은 AccountResponse DTO를 JwtProvider에게 넘겨주어 토큰을 발행
	토큰은 발행 유저 정보, 발행 시간, 유효 시간, 해싱 알고리즘과 키를 설정하여 발행 */

@Component
@RequiredArgsConstructor
public class JwtProvider {

    private final RedisDao redisDao;
	private final ObjectMapper objectMapper;

	@Value("${spring.jwt.token.key}")
	private String key;

	@Value("${spring.jwt.live.atk}")
	private Long atkLive;
	
    @Value("${spring.jwt.live.rtk}")
    private Long rtkLive;
	
	@Value("${spring.jwt.issuer}")
	private String issuer;
	

	@PostConstruct
	protected void init() {
		
		key = Base64.getEncoder().encodeToString(key.getBytes());
		
		System.out.println(key);
	}

	// 로그인으로 토큰 발급 메소드
	public TokenResponse createTokensByLogin(AccountDTO accountResponse) throws JsonProcessingException {

		// 발행 유저 정보
		Subject atkSubject = Subject.atk(accountResponse.getAccountId(), accountResponse.getAccountEmail(),
				accountResponse.getAccountName(), accountResponse.getAccountPassword(), accountResponse.getAccountDate(), accountResponse.getAccountGender(), accountResponse.getAccountType());
		
        Subject rtkSubject = Subject.rtk(accountResponse.getAccountId(), accountResponse.getAccountEmail(),
				accountResponse.getAccountName(), accountResponse.getAccountPassword(), accountResponse.getAccountDate(), accountResponse.getAccountGender(),  accountResponse.getAccountType());
		

		String atk = createToken(atkSubject, atkLive);
        String rtk = createToken(rtkSubject, rtkLive);

        redisDao.setValues(accountResponse.getAccountEmail(), rtk, Duration.ofMillis(rtkLive));
        
        String type = accountResponse.getAccountType();
		return new TokenResponse(atk, rtk, type);
	}

	// 토큰 생성 메소드
	private String createToken(Subject subject, Long tokenLive) throws JsonProcessingException {

		// 발행 유저 정보
		String subjectStr = objectMapper.writeValueAsString(subject);
		Claims claims = Jwts.claims().setSubject(subjectStr); 

		// 발행 시간, 유효 시간
		long now = (new Date()).getTime();
		
		Date accessTokenExpiresIn = new Date(now + tokenLive); 

		System.out.println("Atk 발급 시간 " + now);
		
		System.out.println("만료 시간 " + accessTokenExpiresIn); // 300000(1000 = 1s) 즉, 5분으로 설정
		
		// 해싱 알고리즘과 키
		return Jwts.builder()
				.setIssuer(issuer) 
				.setClaims(claims)
				.setIssuedAt(new Date(now)) //생성일 설정
				.setExpiration(accessTokenExpiresIn) //만료일 설정
				.signWith(SignatureAlgorithm.HS256, key).compact();
	}
	
	
	
	
	
	// 토큰의 payload 에 있는 유저 정보를 Subject 에 담아 확인 하기
    public Subject getSubject(String atk) throws JsonProcessingException {
        
    	String subjectStr = Jwts.parser().setSigningKey(key).parseClaimsJws(atk).getBody().getSubject();
        
        return objectMapper.readValue(subjectStr, Subject.class); // JSON 파일을 Java 객체로
    }
    
    // atk 재발급
    public TokenResponse reissueAtk(AccountDTO accountResponse) throws JsonProcessingException {
        
    	String rtkInRedis = redisDao.getValues(accountResponse.getAccountEmail());
        
    	// 서버 측  redis DB 에 저장해둔 rtk - rtk 가 만료 된다면?
        if (Objects.isNull(rtkInRedis)) throw new ForbiddenException("인증 정보가 만료되었습니다.");
        
        Subject atkSubject = Subject.atk(accountResponse.getAccountId(), accountResponse.getAccountEmail(),
				accountResponse.getAccountName(), accountResponse.getAccountPassword(), accountResponse.getAccountGender(), accountResponse.getAccountDate(),accountResponse.getAccountType());
		
        String atk = createToken(atkSubject, atkLive);
        
        return TokenResponse.tokenResponse(atk, null);
    }
	
}
