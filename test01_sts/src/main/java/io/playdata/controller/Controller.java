package io.playdata.controller;

import javax.annotation.PostConstruct;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import io.playdata.model.domain.User;

@CrossOrigin
@RestController
public class Controller {

	@PostMapping("/api/users")
	public User user() {
		System.out.println("user Contoller start");
		User user = new User("1", "이명호", "encore", "playdata@gmail.com");
		return user;
	}
//	@GetMapping("/api/users2")
//	public User user2() {
//		System.out.println("user2 Contoller start");
//		User user2 = new User("2", "손흥민", "tot", "tot@gmail.com");
//		return user2;
//	}
}
