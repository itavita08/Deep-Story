package io.playdata.lo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
public class SecurityConfig {

	/** PasswordEncoder를 Bean으로 등록 **/
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

//	@Bean
//	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
//			throws Exception {
//		return authenticationConfiguration.getAuthenticationManager();
//	}

	
	/** 스프링시큐리티의 설정 HttpSecurity **/
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		/* https://kimchanjung.github.io/programming/2020/07/02/spring-security-02/ */
		
		http
			.csrf().disable() // post 방식으로 값을 전송할 때 token을 사용해야하는 보안 설정을 해제
			.authorizeRequests().antMatchers("/account/sign-up", "/account/login").permitAll() // 특정 URL을 설정하며, permitAll()은 antMatchers에서 설정한 URL의 접근을 인증없이 허용
			.anyRequest().authenticated(); // 모든 리소스가 인증을 해야만 접근이 허용

		// http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		return http.build();
	}
}