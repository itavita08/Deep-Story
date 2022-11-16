package io.deepstory.jwt;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TokenDecoding {

	private final JwtProvider jwtProvider;

	public Subject tokenDecode(String authorization) {

			String atk = authorization.substring(7);

			try {

				Subject subject = jwtProvider.getSubject(atk);

				return subject;

			} catch (Exception e) {

				e.printStackTrace();
				
			}
			
		return null;
	}

}
