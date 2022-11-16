package io.deepstory.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import io.deepstory.com.ec2application.ec2application.EC2Start;
import io.deepstory.com.ec2application.ec2application.EC2Stop;
import io.deepstory.model.AccountService;
import io.deepstory.model.PostService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;

@Api(tags = "AdminController")
@RestController
@RequiredArgsConstructor
@RequestMapping("admin")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController {

	@Autowired
	private PostService postService;
	@Autowired
	private AccountService accountService;
	@Autowired
	private EC2Start ec2Start;
	@Autowired
	private EC2Stop ec2Stop;

	private ObjectMapper omapper = new ObjectMapper();

	@io.swagger.annotations.ApiOperation(value = "관리자페이지/남녀 유저수 차트", notes = "남녀 유저수 차트")
	@GetMapping("/gender-chart")
	public String getGender() throws Exception {

		List<Integer> countGender = accountService.getGender();
		String json = new Gson().toJson(countGender);

		return json;

	}

	@io.swagger.annotations.ApiOperation(value = "관리자페이지/전체 유저수,포스트수 차트", notes = "유저수,포스트수 차트")
	@GetMapping("/total-chart")
	public String getTotal() throws Exception {

		int totalPost = postService.getTotalPost();
		int totalUser = accountService.getTotalUser();

		List<Integer> totalList = new ArrayList<Integer>();
		
		totalList.add(totalPost);
		totalList.add(totalUser);

		String json = new Gson().toJson(totalList);

		return json;

	}

	@io.swagger.annotations.ApiOperation(value = "관리자페이지/나이대 차트", notes = "나이대 차트")
	@GetMapping("/age-chart")
	public String getAge() throws Exception {

		Map<String, List<Integer>> age = accountService.getAge();

		int[] cntM = new int[6];
		int[] cntF = new int[6];

		for (int i : age.get("남자")) {
			cntM[(i / 10) - 1]++;
		}

		for (int i : age.get("여자")) {
			cntF[(i / 10) - 1]++;
		}

		HashMap<String, int[]> map = new HashMap<String, int[]>();
		map.put("M", cntM);
		map.put("F", cntF);

		return omapper.writeValueAsString(map);

	}

	@io.swagger.annotations.ApiOperation(value = "관리자페이지/유저 로그인 접속 시간", notes = "유저가 로그인 한 시간")
	@GetMapping("/login-time-chart")
	public String getLoginTime() throws Exception {

		List<List<Integer>> time = accountService.getTime();
		String json = new Gson().toJson(time);

		return json;

	}

	@GetMapping("/aws-flask-start")
	public String awsFlaskStart() throws Exception {

		ec2Start.startInstances();

		HashMap<String, String> map = new HashMap<String, String>();
		map.put("result", "인스턴스 실행 완료");

		return omapper.writeValueAsString(map);

	}

	@GetMapping("/aws-flask-stop")
	public String awsFlaskStop() throws Exception {

		ec2Stop.stopInstances();

		HashMap<String, String> map = new HashMap<String, String>();
		map.put("result", "인스턴스 중지 완료");

		return omapper.writeValueAsString(map);

	}

}
