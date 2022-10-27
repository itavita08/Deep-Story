package io.deep.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.deep.dto.AccountDTO;
import io.deep.service.AccountService;

@RequestMapping("/test")
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class DeepController {
	
	@Autowired
	private AccountService accountService;

	@PostMapping("/test1")
	public String TestMethod(@RequestBody Map<String,String> title) {
		AccountDTO accountData = accountService.getAccount(1);
		System.out.println(title.get("title"));
		System.out.println(title.get("content"));
		System.out.println(title.get("value"));
		return "성동";
	}
}
