package io.deepstory.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;

import io.deepstory.exception.BadRequestException;
import io.deepstory.jwt.Subject;
import io.deepstory.jwt.TokenDecoding;
import io.deepstory.model.SecretService;
import io.deepstory.model.dto.SecretFriendAccountDTO;
import io.deepstory.model.dto.SecretFriendListDTO;
import io.deepstory.model.dto.SecretImageDTO;
import io.deepstory.model.dto.SecretPostDTO;
import io.deepstory.model.dto.SecretPostImageDTO;
import io.deepstory.model.dto.SecretPostListDTO;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;

@Api(tags = "SecretController")
@RestController
@RequiredArgsConstructor
@RequestMapping("secret")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SecretController {

	private final TokenDecoding tokenDecoding;

	@Autowired
	private SecretService secretService;

	private ObjectMapper omapper = new ObjectMapper();

	@io.swagger.annotations.ApiOperation(value="비밀페이지/친구 요청", notes="친구 요청")
	@PostMapping("/request")
		public boolean secretReqeust(@RequestBody Map<String, String> data, HttpServletRequest request) throws Exception {
			
			int hostId = tokenDecoding.tokenDecode(request.getHeader("Authorization")).getAccountId();
			
			String guestEmail = data.get("guestEmail");
			String secretBoard = data.get("secretBoard");
			
			boolean result = secretService.secretReqeust(hostId, guestEmail, secretBoard);
			
			if (result) {
				
				return true;
			}
			return false;
	}

	@io.swagger.annotations.ApiOperation(value="비밀페이지/친구 요청 알람", notes="친구 요청 알람")
	@GetMapping("/alarm")
	public ArrayList<SecretFriendAccountDTO> secretAlarm(HttpServletRequest request) throws Exception {

		int guestId = tokenDecoding.tokenDecode(request.getHeader("Authorization")).getAccountId();

		ArrayList<SecretFriendAccountDTO> alarmList = secretService.secretAlarm(guestId);

		return alarmList;

	}

	@io.swagger.annotations.ApiOperation(value="비밀페이지/친구 요청 수락", notes="친구 요청 수락")
	@PostMapping("/accept")
		public boolean secretAccept(@RequestBody Map<String, String> data, HttpServletRequest request) throws Exception {
		
			boolean result = false;
			int guestId = tokenDecoding.tokenDecode(request.getHeader("Authorization")).getAccountId();
		
			if(data.get("answer").equals("yes") ) {
				
				result = secretService.secretAccept(guestId, data.get("friendEmail"));
				
				if(result) {
					
					return true;
				}
			}else {
				return false;
			}
			
			return false;
			
	}

	@io.swagger.annotations.ApiOperation(value="마이페이지/친구 목록", notes="친구 목록")
	@GetMapping("/friends")
	public ArrayList<SecretFriendListDTO> getSecretFriends(HttpServletRequest request) throws Exception {
		
		int accountId = tokenDecoding.tokenDecode(request.getHeader("Authorization")).getAccountId();
		
		ArrayList<SecretFriendListDTO> friendList = secretService.getSecretFriend(accountId);
		
		return friendList;
		
	}

	@io.swagger.annotations.ApiOperation(value="비밀페이지/각자 프로필 정보 (이름, 이메일)", notes="각자 프로필 정보 (이름, 이메일)")
	@PostMapping("/profil")
	public ArrayList<Object> getSecretProfil(@RequestBody Map<String, String> data,
			HttpServletRequest request) throws Exception {

		Subject account = tokenDecoding.tokenDecode(request.getHeader("Authorization"));

		int secretFriendId = Integer.parseInt(data.get("secretFriendId"));

		HashMap<String, SecretFriendAccountDTO> profil = secretService.getSecretProfil(account, secretFriendId,
				data.get("friendEmail"));
		
		ArrayList<SecretPostListDTO> secretPostList = secretService.getSecretPostList(secretFriendId);
		
		ArrayList<Object> all = new ArrayList<Object>();
		
		all.add(profil);
		all.add(secretPostList);

		return all;

	}

	@io.swagger.annotations.ApiOperation(value="비밀페이지/게시글 목록 반환", notes="게시글 목록 반환")
	@GetMapping("/list")
	public ArrayList<SecretPostListDTO> getSecretPostList(@RequestBody Map<String, String> data,
			HttpServletRequest request) throws Exception {

		ArrayList<SecretPostListDTO> secretPostList = secretService
				.getSecretPostList(Integer.parseInt(data.get("secretFriendId")));

		return secretPostList;

	}
	
	@io.swagger.annotations.ApiOperation(value="비밀페이지/게시글 저장", notes="게시글 저장")
	@PostMapping("/save")
	public String secretPostInsert(@RequestBody SecretPostImageDTO secretPost, HttpServletRequest request) throws Exception {

		JsonObject obj = new JsonObject();

		Subject subject = tokenDecoding.tokenDecode(request.getHeader("Authorization"));

		if (secretPost.getSecretTitle() != null) {

			SecretPostDTO newPost = SecretPostDTO.builder().secretPostName(secretPost.getSecretTitle()).secretPostContents(secretPost.getSecretContents()).secretFriendId(secretPost.getSecretFriendId())
					.secretWriterId(subject.getAccountId()).build();

			int secretPostId = secretService.secretPostInsert(newPost);

			if (secretPostId != 0) {
				
				SecretImageDTO newImage = SecretImageDTO.builder().secretImageName(secretPost.getSecretImage().get(0).get("name"))
						.secretPostId(secretPostId).build();

				int finalPostId = secretService.addSecretImage(newImage);
				
				
				if (finalPostId != 0) {

					obj.addProperty("postId", finalPostId);

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
	
	@io.swagger.annotations.ApiOperation(value="비밀페이지/비밀게시물 조회 후 특정 게시물 정보 반환 ", notes="비밀게시물 조회 후 특정 게시물 정보 반환")
	@PostMapping("/read")
	public String getSecretPost(@RequestBody Map<String, Integer> input) throws Exception {

		SecretPostDTO secretPostDTO = null;
		String imageName = "noimage";

		try {
			
			if (input != null) {
				
				secretPostDTO = secretService.getSecretPost(input.get("secretPostId"));
				imageName = secretService.getSecretImage(input.get("secretPostId"));
			}

		} catch (Exception e) {
			
			throw new BadRequestException("이미지가 존재하지 않습니다.");
		}

		if (secretPostDTO != null) {
			HashMap<String, String> map = new HashMap<String, String>();
			map.put("title", secretPostDTO.getSecretPostName());
			map.put("content", secretPostDTO.getSecretPostContents());
			map.put("image", imageName);

			return omapper.writeValueAsString(map);
		}
		return null;
	}
	
		@io.swagger.annotations.ApiOperation(value="비밀페이지/비밀 게시물 삭제 ", notes="비밀 게시물 삭제")
		@PostMapping("/delete")
		public String secretPostDelete(@RequestBody Map<String, Integer> input) throws Exception {

			if (input != null) {
				
				if (secretService.deleteSecretPost(input.get("secretPostId"))) {
					
					HashMap<String, String> map = new HashMap<String, String>();
					map.put("result", "true");

					return omapper.writeValueAsString(map);
					
				}
				return null;
			}
			return null;
		}
		
	//비밀게시물 수정
		@io.swagger.annotations.ApiOperation(value="비밀페이지/비밀게시물 수정 ", notes="비밀게시물 수정")
		@PostMapping("/white")
		public String secretPostUpdate(@RequestBody SecretPostImageDTO secretPost, HttpServletRequest request) throws Exception {

			JsonObject obj = new JsonObject();

			if (secretPost.getSecretTitle() != null) {

				int postId = secretService.updateSecretPost(secretPost);

				obj.addProperty("secretPostId", postId);

				return obj.toString();
				
			}
			return null;
		}
    
}
