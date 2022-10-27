package io.deep.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.deep.model.dto.PostDTO;
import io.deep.model.service.PostService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProjectController {
	
	
	@Autowired
	private PostService postService;
	
	private ObjectMapper omapper = new ObjectMapper();
	
	@PostMapping(value="/test")
	public Map<String, String> test01(@RequestBody Map<String, String> inputData) {
		System.out.println(inputData);
		if(inputData.get("postName") != null) {
			PostDTO newPost = PostDTO.builder().postId(1).postName(inputData.get("postName")).postContents(inputData.get("postContent")).accountId(1).build();
			System.out.println(newPost);
			boolean result = postService.addPost(newPost);
			if(result) {
				return inputData;
			}
		}else {
			inputData.clear();
			inputData.put("result", "fail");
		}
		return null;
	}
	
	@RequestMapping(value="/test2", method= {RequestMethod.POST,RequestMethod.GET})
	public String test02(@RequestBody Map<String, Integer> input) throws Exception {
		int postId = input.get("postId");
		System.out.println(input);
		System.out.println(input.get("postId"));
		if(input.get("postId") != null) {
			PostDTO postDTO = postService.getPost(postId);
			if(postDTO != null) {
				return omapper.writeValueAsString(postDTO);
			}
		}
		return null;
	}
}