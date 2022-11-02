package io.deepstory.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServlet;
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
import io.deepstory.model.dto.SignUpRequestDTO;
import io.deepstory.model.entity.PostEntity;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AccountController {

	private final AccountService accountService;
    private final JwtProvider jwtProvider;
    
	@Autowired
	private PostService postService;
	
	private ObjectMapper omapper = new ObjectMapper();
	
	private final TokenDecoding tokenDecoding;

    /** 토큰이 필요없는 페이지: 로그인, 회원가입  => /auth/** 로 url 지정.!!  **/
    // 회원가입
	@PostMapping("/auth/signUp")
	public AccountDTO signUp(@RequestBody SignUpRequestDTO signUpRequest) {
	    
	    System.out.println(signUpRequest.getAccountGender());

		return accountService.signUp(signUpRequest);
	}

	// 로그인 
	@PostMapping("/auth/login")
	public TokenResponse login(@RequestBody LoginRequestDTO loginRequest) throws JsonProcessingException {
		
		// 로그인 정보 확인 후 성공 시 계정 정보 들고 오기 (틀린 정보 시 서비스단에서 예외 발생)
		AccountDTO accountResponse = accountService.login(loginRequest);
		
		System.out.println(loginRequest.getAccountEmail());
		System.out.println(loginRequest.getAccountPassword());
		
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
    
    /** Board **/
    
    // 게시물 저장
    @PostMapping(value="/postInsert")
	public String postInsert(@RequestBody PostImageDTO postImage, HttpServletRequest request){
        
        JsonObject obj =new JsonObject();
    	
    	System.out.println("----------1. 게시물 저장----------");
    	System.out.println("1-1. react에서 받아온 data 출력");
    	System.out.println(postImage);
    	
    	Subject subject = tokenDecoding.tokenDecode(request.getHeader("Authorization"));
    			
		if(postImage.getTitle() != null) {
			
			PostDTO newPost = PostDTO.builder().postName(postImage.getTitle()).postContents(postImage.getContent()).accountId(subject.getAccountId()).build();
			System.out.println("----------2. 저장 전 postDTO.build 출력----------");
			System.out.println(newPost);
			
			int postId = postService.addPost(newPost);
			System.out.println("-------------6. save 후 postId 확인------------");
			System.out.println(postId);
			
			if(postId != 0) {
			    System.out.println("-------------7. 저장 전 imageDTO.build 출력------------");
			    ImageDTO newImage = ImageDTO.builder().imageName(postImage.getImage().get(0).get("name")).accountId(subject.getAccountId()).postId(postId).build();
			    System.out.println(newImage);
			    
			    int finalPostId = postService.addImage(newImage);
			    if(finalPostId != 0) {
			        System.out.println("---------10. postId 반환------------");
			        System.out.println(finalPostId);
			        
			        obj.addProperty("postId",finalPostId);
			        
			        System.out.println("---------11. react로 반환 값 확인------------");
			        System.out.println(obj.toString());
			        
			        return obj.toString();
			        
			    } else {
			        return null;
			    }
			} else {
			    return null;
			}
		} else {
			return null;
		}
	}
	
    // 게시물 조회 후 특정 게시물 정보 반환
	@PostMapping("/postDetail")
	public String postDetail(@RequestBody Map<String,Integer> input) throws Exception {
		
		System.out.println("---------12. 상세 게시물 시작------------");
		System.out.println("12-1 상세 게시물 react 반환값 확인");
		System.out.println(input);

		if(input != null) {
			PostDTO postDTO = postService.getPost(input.get("postId"));
			System.out.println("Post 완료");
			String imageName = postService.getImage(input.get("postId"));
			System.out.println("---------게시물 조회----------");
			System.out.println(postDTO.toString());
			System.out.println("wwww");
			System.out.println(imageName.toString());
			
			if(postDTO != null) {
			    HashMap<String, String> map = new HashMap<String, String>();
			    map.put("title", postDTO.getPostName());
			    map.put("content", postDTO.getPostContents());
			    map.put("image", imageName);
			    
				return omapper.writeValueAsString(map);
			}
		}
		return null;
	}
	
	// 게시물 삭제
	@PostMapping("/postDelete")
	public String postDelete(@RequestBody Map<String,Integer> input) throws Exception {
	    
	    System.out.println("---------13. 게시물삭제------------");
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
	
	
	// 게시물 수정
    @PostMapping("/postUpdate")
    public String postUpdate(@RequestBody PostImageDTO postImage, HttpServletRequest request){
        
        JsonObject obj =new JsonObject();
        
        System.out.println("----------게시물 수정----------");
        System.out.println("1-1. react에서 받아온 data 출력");
        System.out.println(postImage);
        
        Subject subject = tokenDecoding.tokenDecode(request.getHeader("Authorization"));
                
        if(postImage.getTitle() != null) {
            
//            PostDTO newPost = PostDTO.builder().postName(postImage.getTitle()).postContents(postImage.getContent()).accountId(subject.getAccountId()).build();
            System.out.println("----------2. 저장 전 postDTO.build 출력----------");
//            System.out.println(newPost);
            
            int postId = postService.updatePost(postImage);
            System.out.println("-------------6. save 후 postId 확인------------");
            System.out.println(postId);
            
            obj.addProperty("postId",postId);
            
            return obj.toString();
        }
        return null;
    }
    
    // 좋아요
    @PostMapping("/postLove")
    public String postLove(@RequestBody Map<String,Integer> input, HttpServletRequest request) throws JsonProcessingException {
        
        Subject subject = tokenDecoding.tokenDecode(request.getHeader("Authorization"));
        int accountId = subject.getAccountId();
        
        int postId = input.get("postId");
        
        if(postService.addLove(accountId, postId) == true) {
            HashMap<String, String> map = new HashMap<String, String>();
            map.put("result", "true");
            return omapper.writeValueAsString(map);
        }
        HashMap<String, String> map = new HashMap<String, String>();
        map.put("result", "false");
        return omapper.writeValueAsString(map);
        
    }
    

    


}
