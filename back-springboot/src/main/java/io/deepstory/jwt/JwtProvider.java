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
		
	}

	public TokenResponse createTokensByLogin(AccountDTO accountResponse) throws JsonProcessingException {

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

	private String createToken(Subject subject, Long tokenLive) throws JsonProcessingException {

		String subjectStr = objectMapper.writeValueAsString(subject);
		Claims claims = Jwts.claims().setSubject(subjectStr); 

		long now = (new Date()).getTime();
		
		Date accessTokenExpiresIn = new Date(now + tokenLive); 

		return Jwts.builder()
				.setIssuer(issuer) 
				.setClaims(claims)
				.setIssuedAt(new Date(now))
				.setExpiration(accessTokenExpiresIn)
				.signWith(SignatureAlgorithm.HS256, key).compact();
		
	}

    public Subject getSubject(String atk) throws JsonProcessingException {
        
    	String subjectStr = Jwts.parser().setSigningKey(key).parseClaimsJws(atk).getBody().getSubject();
        
        return objectMapper.readValue(subjectStr, Subject.class);
        
    }
    
    public TokenResponse reissueAtk(AccountDTO accountResponse) throws JsonProcessingException {
        
    	String rtkInRedis = redisDao.getValues(accountResponse.getAccountEmail());
    	
        if (Objects.isNull(rtkInRedis)) throw new ForbiddenException("인증 정보가 만료되었습니다.");
        
        Subject atkSubject = Subject.atk(accountResponse.getAccountId(), accountResponse.getAccountEmail(),
				accountResponse.getAccountName(), accountResponse.getAccountPassword(), accountResponse.getAccountGender(), accountResponse.getAccountDate(),accountResponse.getAccountType());
		
        String atk = createToken(atkSubject, atkLive);
        
        return TokenResponse.tokenResponse(atk, null);
        
    }
	
}
