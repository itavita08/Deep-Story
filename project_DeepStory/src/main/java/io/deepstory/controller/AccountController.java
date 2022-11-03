package io.deepstory.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;

import io.deepstory.jwt.AccountDetails;
import io.deepstory.jwt.JwtProvider;
import io.deepstory.jwt.Subject;
import io.deepstory.jwt.TokenDecoding;
import io.deepstory.jwt.TokenResponse;
import io.deepstory.model.AccountService;
import io.deepstory.model.PostService;
import io.deepstory.model.dto.AccountDTO;
import io.deepstory.model.dto.ImageDTO;
import io.deepstory.model.dto.LoginRequestDTO;
import io.deepstory.model.dto.PostDTO;
import io.deepstory.model.dto.PostImageDTO;
import io.deepstory.model.dto.PostListDTO;
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
	
	private ModelMapper mapper = new ModelMapper();

	/** 토큰이 필요없는 페이지: 로그인, 회원가입 => /auth/** 로 url 지정.!! **/
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

	// 재발급 요청 용 - atk 만료되었다고 응답하면, rtk 로 요청하여 atk 재발급
	@GetMapping("/reissue")
	public TokenResponse reissue(@AuthenticationPrincipal AccountDetails accountDetails)
			throws JsonProcessingException {

		AccountDTO accountResponse = AccountDTO.toDTO(accountDetails.getAccount());

		// 클라이언트에 재발급한 atk 로 응답
		return jwtProvider.reissueAtk(accountResponse);
	}

	/**
	 * Board
	 * 
	 * @throws Exception
	 **/

	// 게시물 저장
	@PostMapping("/postInsert")
	public String postInsert(@RequestBody PostImageDTO postImage, HttpServletRequest request) throws Exception {

		JsonObject obj = new JsonObject();

		Subject subject = tokenDecoding.tokenDecode(request.getHeader("Authorization"));

		if (postImage.getTitle() != null) {

			PostDTO newPost = PostDTO.builder().postName(postImage.getTitle()).postContents(postImage.getContent())
					.accountId(subject.getAccountId()).build();
			int postId = postService.addPost(newPost);

			if (postId != 0) {
				
				ImageDTO newImage = ImageDTO.builder().imageName(postImage.getImage().get(0).get("name"))
						.accountId(subject.getAccountId()).postId(postId).build();
				

				int finalPostId = postService.addImage(newImage);
				if (finalPostId != 0) {
					obj.addProperty("postId", finalPostId);
					return obj.toString();
				}
			}
		}
		return null;
	}

	// 게시물 조회 후 특정 게시물 정보 반환
	@PostMapping("/postDetail")
	public String postDetail(@RequestBody Map<String, Integer> input) throws Exception {
		if (input != null) {
			PostDTO postDTO = postService.getPost(input.get("postId"));
			String imageName = postService.getImage(input.get("postId"));
			AccountDTO accountDTO = postService.getAccount(input.get("postId"));

			if (postDTO != null) {
				HashMap<String, String> map = new HashMap<String, String>();
				map.put("title", postDTO.getPostName());
				map.put("content", postDTO.getPostContents());
				map.put("image", imageName);
				map.put("email", accountDTO.getAccountEmail());
				return omapper.writeValueAsString(map);
			}
		}
		return null;
	}
	
	//게시물 삭제  
	@PostMapping("/postDelete")
	public String postDelete(@RequestBody Map<String, Integer> input) throws Exception {
		System.out.println(input);
		if(input != null) {
	        if(postService.deletePost(input.get("postId"))) {
	            HashMap<String, String> map = new HashMap<String, String>();
	            map.put("result", "true");
	            
	            System.out.println(map.toString());
	            return omapper.writeValueAsString(map);
	        }
	        return null;
	    }
	    return null;
	}
	
	//홈페이지의 게시물 전체 조회 
	@PostMapping("/postAll")
	public String postAll() throws Exception {
		System.out.println("-------post controller-----");
		ArrayList<PostListDTO> postAll = postService.getPostAll();
		System.out.println(postAll.get(0).toString());
		return omapper.writeValueAsString(postAll);
	}
	
	// 게시물 수정
    @PostMapping(value="/postUpdate")
    public String postUpdate(@RequestBody PostImageDTO postImage, HttpServletRequest request){
    	JsonObject obj =new JsonObject();
    	
    	Subject subject = tokenDecoding.tokenDecode(request.getHeader("Authorization"));
    	
    	if(postImage.getTitle() != null) {
    		int postId = postService.updatePost(postImage);
    		obj.addProperty("postId",postId);
            
            return obj.toString();
    	}
    	return null;
    }
	

}
