package io.playdata.lo.cotroller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;

import io.playdata.lo.domain.AccountService;
import io.playdata.lo.jwt.AccountDetails;
import io.playdata.lo.jwt.JwtProvider;
import io.playdata.lo.jwt.TokenResponse;
import io.playdata.lo.model.dto.AccountResponse;
import io.playdata.lo.model.dto.LoginRequest;
import io.playdata.lo.model.dto.SignUpRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/account") // 바꾸면 SecurityConfig 까먹지 말고 바꿔주기.
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AccountController {

	private final AccountService accountService;
    private final JwtProvider jwtProvider;

    /** 토큰이 필요없는 페이지: 로그인, 회원가입  => /auth/** 로 url 지정.!!  **/
    /* 회원가입 */
	@PostMapping("/auth/sign-up")
	public AccountResponse signUp(@RequestBody SignUpRequest signUpRequest) {

		System.out.println("회원가입 시도");
		System.out.println(signUpRequest.getClass());
		System.out.println(signUpRequest.getAccountName());
		System.out.println(signUpRequest.getAccountGender());
		
		
		return accountService.signUp(signUpRequest);
	}

	/* 로그인 */
	@PostMapping("/auth/login")
	public TokenResponse login(@RequestBody LoginRequest loginRequest) throws JsonProcessingException {
		
		System.out.println("로그인 시도");
		
		System.out.println(loginRequest.getAccountEmail());
		System.out.println(loginRequest.getAccountPassword());
		
		// 로그인 정보 확인 후 성공 시 계정 정보 들고 오기 (틀린 정보 시 서비스단에서 예외 발생)
		AccountResponse accountResponse = accountService.login(loginRequest);
		
		// 로그인 검증 성공으로 토큰 발급 // atk, rtk 발급
		return jwtProvider.createTokensByLogin(accountResponse);
	}
	
	// 태스트용
    @RequestMapping({ "/hello" })
    public String firstPage() {
        return "Hello. you have valid JWT (JSon Web Token)!";
    }
    
    // 재발급 요청 용 - atk 만료되었다고 응답하면, rtk 로 요청하여  atk 재발급
    @GetMapping("/reissue")
    public TokenResponse reissue(
            @AuthenticationPrincipal AccountDetails accountDetails
    ) throws JsonProcessingException {
    	
        AccountResponse accountResponse = AccountResponse.of(accountDetails.getAccount());
        
        System.out.println("재발급 시도!!");
        
        // 클라이언트에 재발급한 atk 로 응답
        return jwtProvider.reissueAtk(accountResponse);
    }
    
	@GetMapping("/add")
	public String add_text() {
		
		System.out.println("spring!! 접속 허용!!");
		
		return "접속 허용----- 예!!!!!!!!!!";
	}
    
    @PostMapping("/api/insert")
    public void boardInsert(@RequestParam String title,  @RequestParam String content){
        System.out.println(title);
        System.out.println(content);
    }
    
    @PostMapping("/api/get")
    public String boardGet(){

    	return "글 쓰기 성공";
    }
}
