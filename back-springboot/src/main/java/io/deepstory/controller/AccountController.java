package io.deepstory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.deepstory.jwt.AccountDetails;
import io.deepstory.jwt.JwtProvider;
import io.deepstory.jwt.TokenResponse;
import io.deepstory.model.AccountService;
import io.deepstory.model.dto.AccountDTO;
import io.deepstory.model.dto.LoginRequestDTO;
import io.deepstory.model.dto.SignUpRequestDTO;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;

@Api(tags = "AccountController")
@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AccountController {

	private final JwtProvider jwtProvider;
	
	@Autowired
	private AccountService accountService;	 

	@io.swagger.annotations.ApiOperation(value="회원가입", notes="생년월일, 이메일, 성별, 이름, 비밀번호 기입 후 회원가입")
	@PostMapping("/signUp")
	public AccountDTO signUp(@RequestBody SignUpRequestDTO signUpRequest) throws Exception {
		
		return accountService.signUp(signUpRequest);
		
	}

	@io.swagger.annotations.ApiOperation(value="로그인", notes="아이디와 비밀번호로 로그인")
	@PostMapping("/login")
	public TokenResponse login(@RequestBody LoginRequestDTO loginRequest) throws Exception {

		AccountDTO accountResponse = accountService.login(loginRequest);

		accountService.userJoinTime();

		return jwtProvider.createTokensByLogin(accountResponse);

	}

	@io.swagger.annotations.ApiOperation(value="토큰 재발행", notes="atk 만료되었다고 응답하면, rtk로 요청하여 atk 재발급")
	@GetMapping("/reissue")
	public TokenResponse reissue(@AuthenticationPrincipal AccountDetails accountDetails)
			throws Exception {

		AccountDTO accountResponse = AccountDTO.toDTO(accountDetails.getAccount());

		return jwtProvider.reissueAtk(accountResponse);
		
	}

}
