package io.playdata.lo.cotroller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;

import io.playdata.lo.domain.AccountService;
import io.playdata.lo.jwt.JwtProvider;
import io.playdata.lo.jwt.TokenResponse;
import io.playdata.lo.model.dto.AccountResponse;
import io.playdata.lo.model.dto.LoginRequest;
import io.playdata.lo.model.dto.SignUpRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {

	private final AccountService accountService;
    private final JwtProvider jwtProvider;

    /* 회원가입 */
	@PostMapping("/sign-up")
	public AccountResponse signUp(@RequestBody SignUpRequest signUpRequest) {

		System.out.println("회원가입 시도");
		System.out.println(signUpRequest);
		return accountService.signUp(signUpRequest);
	}

	/* 로그인 */
	@PostMapping("/login")
	public TokenResponse login(@RequestBody LoginRequest loginRequest) throws JsonProcessingException {
		
		System.out.println("로그인 시도");
		
		// 로그인 정보 확인 후 성공 시 계정 정보 들고 오기 (틀린 정보 시 서비스단에서 예외 발생)
		AccountResponse accountResponse = accountService.login(loginRequest);
		
		// 로그인 검증 성공으로 토큰 발급
		return jwtProvider.createTokensByLogin(accountResponse);
	}
}
