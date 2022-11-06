package io.deepstory.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import io.deepstory.jwt.AccountDetailsService;
import io.deepstory.jwt.JwtAuthenticationFilter;
import io.deepstory.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	
	 private final JwtProvider jwtProvider;
	    private final AccountDetailsService accountDetailsService;
	    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;


	// PasswordEncoder를 Bean으로 등록 
	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}


	// 스프링시큐리티의 설정 HttpSecurity
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http.cors().and().csrf().disable()
			.exceptionHandling()
			.authenticationEntryPoint(customAuthenticationEntryPoint) 
			.and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            
            // 로그인, 회원가입 API 는 토큰이 없는 상태로 요청 들어오니 이 두 개 허용 해주기 !!
			.authorizeRequests().antMatchers("/auth/**", "/postAll", "/searchUserPost").permitAll() 
			.anyRequest().authenticated()
			.and()
	        .addFilterBefore(new JwtAuthenticationFilter(jwtProvider, accountDetailsService),
	                UsernamePasswordAuthenticationFilter.class); 
		
	    http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());

		return http.build();
	}
}