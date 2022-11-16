package io.deepstory.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import io.deepstory.exception.BadRequestException;
import io.deepstory.jwt.Subject;
import io.deepstory.jwt.TokenDecoding;
import io.deepstory.model.PostService;
import io.deepstory.model.dto.AccountDTO;
import io.deepstory.model.dto.ImageDTO;
import io.deepstory.model.dto.PostDTO;
import io.deepstory.model.dto.PostImageDTO;
import io.deepstory.model.dto.PostListDTO;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;

@Api(tags = "PostController")
@RestController
@RequiredArgsConstructor
@RequestMapping("board")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PostController {

	private final TokenDecoding tokenDecoding;

	@Autowired
	private PostService postService;

	private ObjectMapper omapper = new ObjectMapper();

	@io.swagger.annotations.ApiOperation(value="게시물 저장", notes="제목,내용 입력후 게시판에 데이터 저장")
	@PostMapping(value = "/save")
	public String test01(@RequestBody PostImageDTO postImage, HttpServletRequest request) throws Exception {

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

	@io.swagger.annotations.ApiOperation(value="게시물 조회", notes="게시물 조회 후 특정 게시물 정보 반환")
	@PostMapping("/read")
	public String test02(@RequestBody Map<String, Integer> input, HttpServletRequest request) throws Exception {

		PostDTO postDTO = null;
		String result = "false";
		String imageName = "noimage";
		AccountDTO accountDTO = new AccountDTO();

		int userId = tokenDecoding.tokenDecode(request.getHeader("Authorization")).getAccountId();

		try {
			
			if (input != null) {
				
				postDTO = postService.getPost(input.get("postId"));
				imageName = postService.getImage(input.get("postId"));
				result = postService.checkId(userId, input.get("postId"));
				accountDTO = postService.getAccount(input.get("postId"));
			}
		} catch (Exception e) {
			
			throw new BadRequestException("이미지가 존재 하지 않습니다.");
		}

		result = postService.checkId(userId,input.get("postId"));

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

	@io.swagger.annotations.ApiOperation(value="게시물 삭제", notes="게시물 삭제")
	@PostMapping("/delete")
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

	@io.swagger.annotations.ApiOperation(value="게시물 수정", notes="게시물 수정")
	@PostMapping("/white")
	public String postUpdate(@RequestBody PostImageDTO postImage, HttpServletRequest request) throws Exception {

		JsonObject obj = new JsonObject();

		if (postImage.getTitle() != null) {

			int postId = postService.updatePost(postImage);

			obj.addProperty("postId", postId);

			return obj.toString();
			
		}
		return null;
	}

	@io.swagger.annotations.ApiOperation(value="게시물/좋아요 기능", notes="좋아요 버튼 클릭시 좋아요 테이블에 저장")
	@PostMapping("/like")
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

	@io.swagger.annotations.ApiOperation(value="메인 페이지/상위 3개 게시물", notes="좋아요를 가장 많이 받은 게시물 상위3개")
	@GetMapping("/best")
	public String showBestPost() throws Exception {

		HashMap<String, Map<String, String>> map = postService.showBestPost();

		return omapper.writeValueAsString(map);

	}

	@io.swagger.annotations.ApiOperation(value="마이페이지/갤러리", notes="포스트 중 이미지만 갤러리에 불러오기")
	@GetMapping("/gallery")
	public String showGallery(HttpServletRequest request) throws Exception {

		Subject subject = tokenDecoding.tokenDecode(request.getHeader("Authorization"));
		int accountId = subject.getAccountId();

		List<String> imageNameList = postService.getAllImage(accountId);

		String json = new Gson().toJson(imageNameList);

		return json;

	}

	@io.swagger.annotations.ApiOperation(value="마이페이지/프로필", notes="사용자 프로필")
	@GetMapping("/profil")
	public Subject getProfil(HttpServletRequest request) throws Exception {

		Subject subject = tokenDecoding.tokenDecode(request.getHeader("Authorization"));

		return subject;

	}

	@io.swagger.annotations.ApiOperation(value="마이페이지/유저의 게시물 목록", notes="유저의 게시물 목록")
	@GetMapping("/list")
	public ArrayList<PostListDTO> getPostListbyUser(HttpServletRequest request) throws Exception {

		Subject subject = tokenDecoding.tokenDecode(request.getHeader("Authorization"));

		ArrayList<PostListDTO> postList = postService.getPostListByUser(subject.getAccountId());

		return postList;

	}

	@io.swagger.annotations.ApiOperation(value="메인페이지/상단 검색바", notes="게시물 검색")
	@PostMapping("/search")
	public ArrayList<PostListDTO> searchUserPost(@RequestBody Map<String, String> keyword, HttpServletRequest request)
			throws Exception {

		ArrayList<PostListDTO> searchResult = postService.searchUserPost(keyword.get("keyword"));

		return searchResult;

	}

	@io.swagger.annotations.ApiOperation(value="마이페이지/게시물 전체 조회", notes="게시물 전체 조회")
	@GetMapping("/all")
	public String postAll() throws Exception {

		ArrayList<PostListDTO> postAll = postService.getPostAll();

		return omapper.writeValueAsString(postAll);
		
	}

    
    @io.swagger.annotations.ApiOperation(value="마이페이지/유저의 좋아요 게시물 목록", notes="유저의 좋아요 게시물 목록")
    @GetMapping("/interest")
	public ArrayList<PostListDTO> getInterestPost(HttpServletRequest request) throws Exception {
    	
		Subject subject = tokenDecoding.tokenDecode(request.getHeader("Authorization"));
	
		ArrayList<PostListDTO> postList = postService.getInterestPost(subject.getAccountId());
		
		return postList;
		
	}

}
