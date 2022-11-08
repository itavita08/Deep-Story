package io.deepstory.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import io.deepstory.jwt.AccountDetails;
import io.deepstory.jwt.JwtProvider;
import io.deepstory.jwt.Subject;
import io.deepstory.jwt.TokenDecoding;
import io.deepstory.jwt.TokenResponse;
import io.deepstory.model.AccountService;
import io.deepstory.model.PostService;
import io.deepstory.model.SecretService;
import io.deepstory.model.dto.AccountDTO;
import io.deepstory.model.dto.ImageDTO;
import io.deepstory.model.dto.LoginRequestDTO;
import io.deepstory.model.dto.PostDTO;
import io.deepstory.model.dto.PostImageDTO;
import io.deepstory.model.dto.PostListDTO;
import io.deepstory.model.dto.SecretFriendAccountDTO;
import io.deepstory.model.dto.SecretFriendListDTO;
import io.deepstory.model.dto.SecretImageDTO;
import io.deepstory.model.dto.SecretPostDTO;
import io.deepstory.model.dto.SecretPostImageDTO;
import io.deepstory.model.dto.SecretPostListDTO;
import io.deepstory.model.dto.SignUpRequestDTO;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Api( tags = "Clients")
public class ProjectController {

	private final JwtProvider jwtProvider;
	private final TokenDecoding tokenDecoding;

	@Autowired
	private PostService postService;
	@Autowired
	private AccountService accountService;
	@Autowired
	private SecretService secretService;

	private ObjectMapper omapper = new ObjectMapper();
	

	// 회원가입
	@PostMapping("/auth/signUp")
	public AccountDTO signUp(@RequestBody SignUpRequestDTO signUpRequest) {

		return accountService.signUp(signUpRequest);
	}

	// 로그인
	@PostMapping("/auth/login")
	public TokenResponse login(@RequestBody LoginRequestDTO loginRequest) throws JsonProcessingException {

		AccountDTO accountResponse = accountService.login(loginRequest);

		accountService.userJoinTime();

		return jwtProvider.createTokensByLogin(accountResponse);

	}

	// 재발급 요청 용 - atk 만료되었다고 응답하면, rtk 로 요청하여 atk 재발급
	@GetMapping("/reissue")
	public TokenResponse reissue(@AuthenticationPrincipal AccountDetails accountDetails)
			throws JsonProcessingException {

		AccountDTO accountResponse = AccountDTO.toDTO(accountDetails.getAccount());

		return jwtProvider.reissueAtk(accountResponse);
	}

	/** Board **/

	// 게시물 저장
	@PostMapping(value = "/postInsert")
	public String test01(@RequestBody PostImageDTO postImage, HttpServletRequest request) throws Exception {

		JsonObject obj = new JsonObject();

		System.out.println("----------1. 게시물 저장----------");
		System.out.println("1-1. react에서 받아온 data 출력");
		System.out.println(postImage);

		Subject subject = tokenDecoding.tokenDecode(request.getHeader("Authorization"));

		if (postImage.getTitle() != null) {

			PostDTO newPost = PostDTO.builder().postName(postImage.getTitle()).postContents(postImage.getContent())
					.accountId(subject.getAccountId()).build();

			System.out.println("----------2. 저장 전 postDTO.build 출력----------");
			System.out.println(newPost);

			int postId = postService.addPost(newPost);
			System.out.println("-------------6. save 후 postId 확인------------");
			System.out.println(postId);

			if (postId != 0) {
				System.out.println("-------------7. 저장 전 imageDTO.build 출력------------");
				ImageDTO newImage = ImageDTO.builder().imageName(postImage.getImage().get(0).get("name"))
						.accountId(subject.getAccountId()).postId(postId).build();
				System.out.println(newImage);

				int finalPostId = postService.addImage(newImage);
				if (finalPostId != 0) {
					System.out.println("---------10. postId 반환------------");
					System.out.println(finalPostId);

					obj.addProperty("postId", finalPostId);

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
	public String test02(@RequestBody Map<String, Integer> input, HttpServletRequest request) throws Exception {

		System.out.println("---------12. 상세 게시물 시작------------");
		System.out.println("12-1 상세 게시물 react 반환값 확인");
		System.out.println(input);

		PostDTO postDTO = null;
		String result = "";
		String imageName = "noimage";
		AccountDTO accountDTO = new AccountDTO();
		int userId = tokenDecoding.tokenDecode(request.getHeader("Authorization")).getAccountId();

		try {
			if (input != null) {
				postDTO = postService.getPost(input.get("postId"));
				imageName = postService.getImage(input.get("postId"));
				result = postService.checkId(userId, input.get("postId"));
				accountDTO = postService.getAccount(input.get("postId"));
				System.out.println(result);
			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		if (postDTO != null) {
			HashMap<String, String> map = new HashMap<String, String>();
			map.put("title", postDTO.getPostName());
			map.put("content", postDTO.getPostContents());
			map.put("image", imageName);
			map.put("result", result);
			map.put("email", accountDTO.getAccountEmail());
			return omapper.writeValueAsString(map);
		}

		return null;
	}

	// 게시물 삭제
	@PostMapping("/postDelete")
	public String postDelete(@RequestBody Map<String, Integer> input) throws Exception {

		if (input != null) {
			if (postService.deletePost(input.get("postId"))) {
				HashMap<String, String> map = new HashMap<String, String>();
				map.put("result", "true");

				return omapper.writeValueAsString(map);
			}
			return null;
		}
		return null;
	}

	// 게시물 수정
	@PostMapping("/postUpdate")
	public String postUpdate(@RequestBody PostImageDTO postImage, HttpServletRequest request) throws Exception {

		JsonObject obj = new JsonObject();

		Subject subject = tokenDecoding.tokenDecode(request.getHeader("Authorization"));

		if (postImage.getTitle() != null) {

			int postId = postService.updatePost(postImage);

			obj.addProperty("postId", postId);

			return obj.toString();
		}
		return null;
	}

	// 좋아요
	@PostMapping("/postLove")
	public String postLove(@RequestBody Map<String, Integer> input, HttpServletRequest request) throws Exception {

		Subject subject = tokenDecoding.tokenDecode(request.getHeader("Authorization"));
		int accountId = subject.getAccountId();

		int postId = input.get("postId");

		if (postService.addLove(accountId, postId) == true) {
			HashMap<String, String> map = new HashMap<String, String>();
			map.put("result", "true");
			return omapper.writeValueAsString(map);
		}
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("result", "false");
		return omapper.writeValueAsString(map);

	}

	// 좋아요 순 상위 게시물
	@GetMapping("/bestPost")
	public String showBestPost() throws Exception {

		HashMap<String, Map<String, String>> map = postService.showBestPost();

		System.out.println(omapper.writeValueAsString(map));

		return omapper.writeValueAsString(map);

	}

	// 갤러리
	@GetMapping("/gallery")
	public String showGallery(HttpServletRequest request) throws Exception {

		Subject subject = tokenDecoding.tokenDecode(request.getHeader("Authorization"));
		int accountId = subject.getAccountId();

		List<String> imageNameList = postService.getAllImage(accountId);

		String json = new Gson().toJson(imageNameList);

		System.out.println(json);

		return json;

	}

	// 프로필 정보 반환 - 마이페이지
	@GetMapping("/getProfil")
	public Subject getProfil(HttpServletRequest request) throws Exception {

		System.out.println("프로필 조회");

		Subject subject = tokenDecoding.tokenDecode(request.getHeader("Authorization"));

		return subject;

	}

	// 해당 유저의 게시물 목록 조회 - 마이페이지
	@GetMapping("/getPostListbyUser")
	public ArrayList<PostListDTO> getPostListbyUser(HttpServletRequest request) throws Exception {

		System.out.println(" 특정 유저의 게시물 조회  ");

		Subject subject = tokenDecoding.tokenDecode(request.getHeader("Authorization"));

		ArrayList<PostListDTO> postList = postService.getPostListByUser(subject.getAccountId());

		System.out.println(postList);

		return postList;

	}
	
	//유저의 좋아요 게시물 목록
	@GetMapping("getInterestPost")
	public ArrayList<PostListDTO> getInterestPost(HttpServletRequest request) throws Exception {

		Subject subject = tokenDecoding.tokenDecode(request.getHeader("Authorization"));
	
		ArrayList<PostListDTO> postList = postService.getInterestPost(subject.getAccountId());

		return postList;
	}

	// 검색 기능 - 메인페이지
	@PostMapping("/searchUserPost")
	public ArrayList<PostListDTO> searchUserPost(@RequestBody Map<String, String> keyword, HttpServletRequest request)
			throws Exception {

		System.out.println(" 검색  기능 ");

		ArrayList<PostListDTO> searchResult = postService.searchUserPost(keyword.get("keyword"));

		System.out.println("확인 ----------------");
		System.out.println(searchResult);

		return searchResult;

	}

	// 홈페이지의 게시물 전체 조회
	@GetMapping("/postAll")
	public String postAll() throws Exception {
		System.out.println("-------post controller-----");
		ArrayList<PostListDTO> postAll = postService.getPostAll();
		System.out.println(postAll.get(0).toString());

		return omapper.writeValueAsString(postAll);
	}

	// 비밀 친구 요청
	// return boolean반환으로 수정
	@PostMapping("/secretReqeust")
		public boolean secretReqeust(@RequestBody Map<String, String> data, HttpServletRequest request) throws Exception {
			
			int hostId = tokenDecoding.tokenDecode(request.getHeader("Authorization")).getAccountId();
			System.out.println("data : " + data);
			String guestEmail = data.get("guestEmail");
			String secretBoard = data.get("secretBoard");
			
			boolean result = secretService.secretReqeust(hostId, guestEmail, secretBoard);
			
			if (result) {
				return true;
			}
			return false;
	}

	// 비밀 친구 알람
	@GetMapping("/secretAlarm")
	public ArrayList<SecretFriendAccountDTO> secretAlarm(HttpServletRequest request) throws Exception {

		int guestId = tokenDecoding.tokenDecode(request.getHeader("Authorization")).getAccountId();

		ArrayList<SecretFriendAccountDTO> alarmList = secretService.secretAlarm(guestId);

		return alarmList;

	}

	// 비밀 친구 수락
	@PostMapping("/secretAccept")
		public boolean secretAccept(@RequestBody Map<String, String> data, HttpServletRequest request) throws Exception {
			boolean result = false;
			int guestId = tokenDecoding.tokenDecode(request.getHeader("Authorization")).getAccountId();
			System.out.println("*************비밀친구 수락 data: "+ data + guestId);
		
			if(data.get("answer").equals("yes") ) {
				System.out.println("yes*****************");
				System.out.println(data.get("friendEmail"));
				result = secretService.secretAccept(guestId, data.get("friendEmail"));
				if(result) {
					return true;
				}
			}else {
				// 신청 삭제  
			}
			return false;
	}

	// 마이페이지 친구 목록
	@GetMapping("/getSecretFriends")
	public ArrayList<SecretFriendListDTO> getSecretFriends(HttpServletRequest request) throws Exception {
		int accountId = tokenDecoding.tokenDecode(request.getHeader("Authorization")).getAccountId();
		ArrayList<SecretFriendListDTO> friendList = secretService.getSecretFriend(accountId);
		System.out.println("%%%%%%%%%%%%%%%% 친구 목록 : " + friendList);
		return friendList;
	}

	// 비밀 메인 페이지 정보 반환 - 각자 프로필 정보 (이름, 이메일)
	@PostMapping("/getSecretProfil")
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
		System.out.println("all----------"+all);

		return all;

	}

	// 비밀 메인 페이지 정보 반환 - 게시글 목록 반환
	// 해당 유저의 게시물 조회 - 마이페이지
//	@PostMapping("/getSecretPostList")
//	public ArrayList<SecretPostListDTO> getSecretPostList(@RequestBody Map<String, String> data,
//			HttpServletRequest request) throws Exception {
//		System.out.println("*********게시글 목록 반환 controller");
//		System.out.println(data.get("secretFriendId"));
//		ArrayList<SecretPostListDTO> secretPostList = secretService
//				.getSecretPostList(Integer.parseInt(data.get("secretFriendId")));
//		System.out.println(secretPostList);
//		
//		return secretPostList;
//
//	}
	
	// 비밀게시물 저장
	@PostMapping("/secretPostInsert")
	public String secretPostInsert(@RequestBody SecretPostImageDTO secretPost, HttpServletRequest request) throws Exception {

		JsonObject obj = new JsonObject();

		System.out.println("----------1. 게시물 저장----------");
		System.out.println("1-1. react에서 받아온 data 출력");
		System.out.println(secretPost);
		Subject subject = tokenDecoding.tokenDecode(request.getHeader("Authorization"));

		if (secretPost.getSecretTitle() != null) {

			SecretPostDTO newPost = SecretPostDTO.builder().secretPostName(secretPost.getSecretTitle()).secretPostContents(secretPost.getSecretContents()).secretFriendId(secretPost.getSecretFriendId())
					.secretWriterId(subject.getAccountId()).build();

			System.out.println("----------2. 저장 전 postDTO.build 출력----------");
			System.out.println(newPost);

			int secretPostId = secretService.secretPostInsert(newPost);
			System.out.println("-------------6. save 후 postId 확인------------");
			System.out.println(secretPostId);

			if (secretPostId != 0) {
				System.out.println("-------------7. 저장 전 imageDTO.build 출력------------");
				SecretImageDTO newImage = SecretImageDTO.builder().secretImageName(secretPost.getSecretImage().get(0).get("name"))
						.secretPostId(secretPostId).build();
				System.out.println(newImage);

				int finalPostId = secretService.addSecretImage(newImage);
				
				
				if (finalPostId != 0) {
					System.out.println("---------10. postId 반환------------");
					System.out.println(finalPostId);

					obj.addProperty("postId", finalPostId);

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
	@PostMapping("/secretPostDetail")
	public String getSecretPost(@RequestBody Map<String, Integer> input) throws Exception {

		System.out.println("---------12. 상세 게시물 시작------------");
		System.out.println("12-1 상세 게시물 react 반환값 확인");
		System.out.println(input);

		SecretPostDTO secretPostDTO = null;
		String imageName = "noimage";

		try {
			if (input != null) {
				secretPostDTO = secretService.getSecretPost(input.get("secretPostId"));
				imageName = secretService.getSecretImage(input.get("secretPostId"));
			}

		} catch (Exception e) {
			System.out.println("이미지 없음.");
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

	// 게시물 삭제
	@PostMapping("/secretPostDelete")
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

	// 게시물 수정
	@PostMapping("/secretPostUpdate")
	public String secretPostUpdate(@RequestBody SecretPostImageDTO secretPost, HttpServletRequest request) throws Exception {

		JsonObject obj = new JsonObject();

		Subject subject = tokenDecoding.tokenDecode(request.getHeader("Authorization"));

		if (secretPost.getSecretTitle() != null) {

			int postId = secretService.updateSecretPost(secretPost);

			obj.addProperty("secretPostId", postId);
			System.out.println(obj);

			return obj.toString();
		}
		return null;
	}
	
    // 성별 파이차트
    @GetMapping("/getGender")
    public String getGender() {
        
        List<Integer> countGender = accountService.getGender();
        String json = new Gson().toJson(countGender);
        
        System.out.println(json);
        
        return json;
    }
    
    
    // Total 차트
    @GetMapping("/getTotal")
    public String getTotal() {
        
        int totalPost = postService.getTotalPost();
        int totalUser = accountService.getTotalUser();
        
        List<Integer> totalList = new ArrayList<Integer>();
        
        totalList.add(totalPost);
        totalList.add(totalUser);
        
        String json = new Gson().toJson(totalList);
        
        return json;
    }
    
    
    // 나이 차트
    @GetMapping("/getAge")
    public String getAge() throws JsonProcessingException{
        
        Map<String,List<Integer>> age = accountService.getAge();
        
        int[] cntM = new int[6];
        int[] cntF = new int[6];
        
        
        for(int i:age.get("남자")) {
            cntM[(i/10)-1]++;
        }
        
        for(int i:age.get("여자")) {
            cntF[(i/10)-1]++;
        }
        
        HashMap<String, int[]> map = new HashMap<String, int[]>();
        map.put("M", cntM);
        map.put("F", cntF);

        
        return omapper.writeValueAsString(map);
    }
    
    
    // 로그인 시간
    @GetMapping("/getLoginTime")
    public String getLoginTime() throws JsonProcessingException {
        List<List<Integer>> time = accountService.getTime();
        
        String json = new Gson().toJson(time);
        
        return json;
    }

}
