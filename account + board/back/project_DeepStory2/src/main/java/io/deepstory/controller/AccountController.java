package io.deepstory.controller;

import java.util.Map;
import java.util.Objects;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.deepstory.jwt.AccountDetails;
import io.deepstory.jwt.JwtProvider;
import io.deepstory.jwt.Subject;
import io.deepstory.jwt.TokenDecoding;
import io.deepstory.jwt.TokenResponse;
import io.deepstory.model.AccountService;
import io.deepstory.model.PostService;
import io.deepstory.model.dto.AccountDTO;
import io.deepstory.model.dto.LoginRequestDTO;
import io.deepstory.model.dto.PostDTO;
import io.deepstory.model.dto.SignUpRequestDTO;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AccountController {

	private final AccountService accountService;
    private final JwtProvider jwtProvider;
    
	@Autowired
	private PostService postService;
	
	private final TokenDecoding tokenDecoding;
	
	private ObjectMapper omapper = new ObjectMapper();

    /** 토큰이 필요없는 페이지: 로그인, 회원가입  => /auth/** 로 url 지정.!!  **/
    // 회원가입
	@PostMapping("/auth/signUp")
	public AccountDTO signUp(@RequestBody SignUpRequestDTO signUpRequest) {

		return accountService.signUp(signUpRequest);
	}

	// 로그인 
	@PostMapping("/auth/login")
	public TokenResponse login(@RequestBody LoginRequestDTO loginRequest) throws JsonProcessingException {
		
		// 로그인 정보 확인 후 성공 시 계정 정보 들고 오기 (틀린 정보 시 서비스단에서 예외 발생)
		AccountDTO accountResponse = accountService.login(loginRequest);
		
		// 로그인 검증 성공으로 토큰 발급 // atk, rtk 발급
		return jwtProvider.createTokensByLogin(accountResponse);
		
	}
	
    
    // 재발급 요청 용 - atk 만료되었다고 응답하면, rtk 로 요청하여  atk 재발급
    @GetMapping("/reissue")
    public TokenResponse reissue(
            @AuthenticationPrincipal AccountDetails accountDetails
    ) throws JsonProcessingException {
    	
        AccountDTO accountResponse = AccountDTO.toDTO(accountDetails.getAccount());
        
        // 클라이언트에 재발급한 atk 로 응답
        return jwtProvider.reissueAtk(accountResponse);
    }
    
    /** Board 
     * @throws JsonProcessingException **/
    
    // 게시물 저장
    @PostMapping(value="/postInsert")
	public Map<String, String> test01(@RequestBody Map<String, String> inputData, HttpServletRequest request)  {
    	
    	System.out.println("게시물 저장");
    	System.out.println(inputData);
    	
    	Subject subject = tokenDecoding.tokenDecode(request.getHeader("Authorization"));
		
    	
    	System.out.println(subject.getAccountId());
		
		if(inputData.get("title") != null) {
			
			
			PostDTO newPost = PostDTO.builder().postName(inputData.get("title")).postContents(inputData.get("content")).accountId(subject.getAccountId()).build();

			boolean result = postService.addPost(newPost);
			
			System.out.println(result);

			if(result) {
				return inputData;
			}
			
		}else {
			inputData.clear();
			inputData.put("result", "fail");
		}
		return null;
	}
    
    // 게시물 저장
//    @PostMapping(value="/postInsert")
//	public void test01(@RequestBody Map<String, String> inputData, HttpServletRequest request)  {
//    	
//    	System.out.println("게시물 저장");
//    	System.out.println(inputData);
//    	
//    	System.out.println(request.getHeader("Authorization"));
//    	
//    	
//		String authorization = request.getHeader("Authorization");
//		
//		if (!Objects.isNull(authorization)) {
//			
//			String atk = authorization.substring(7);
//						
//			try {
//				Subject subject = jwtProvider.getSubject(atk);
//				System.out.println(subject.getAccountId());
//				
//				if(inputData.get("title") != null) {
//					
//
//					PostDTO newPost = PostDTO.builder().postName(inputData.get("title")).postContents(inputData.get("content")).accountId(subject.getAccountId()).build();
//
//					boolean result = postService.addPost(newPost);
//					
//					System.out.println(result);
//					
//					if(!result) {
//						//return null;
//					}
//					
//				}else {
//					inputData.clear();
//					inputData.put("result", "fail");
//				}
//				
//				
//				
//				
//			} catch (JsonProcessingException e) {
//				
//				e.printStackTrace();
//			}
//			
//			//return inputData;
//			
//			
//		}
//
//    			
//
//	}
	
    // 게시물 조회 후 특정 게시물 정보 반환
	@PostMapping("/postDetail")
	public String test02(@RequestBody Map<String,Integer> input) throws Exception {
		
		System.out.println("게시물 조회");

		if(input != null) {
			PostDTO postDTO = postService.getPost(input.get("postId"));
			if(postDTO != null) {
				return omapper.writeValueAsString(postDTO);
			}
		}
		return null;
	}
    

    


}
