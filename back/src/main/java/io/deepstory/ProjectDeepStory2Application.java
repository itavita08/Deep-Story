package io.deepstory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import springfox.documentation.swagger2.annotations.EnableSwagger2;


@EnableSwagger2
@SpringBootApplication
public class ProjectDeepStory2Application {

	public static void main(String[] args) {
		SpringApplication.run(ProjectDeepStory2Application.class, args);
	}
	
}
