package io.playdata.lo.config;

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

import io.playdata.lo.jwt.AccountDetailsService;
import io.playdata.lo.jwt.JwtAuthenticationFilter;
import io.playdata.lo.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	
	 private final JwtProvider jwtProvider;
	    private final AccountDetailsService accountDetailsService;
	    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;


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
		
		http.cors().and().csrf().disable()
			.exceptionHandling()
			.authenticationEntryPoint(customAuthenticationEntryPoint) // invalid한 token에 대한 예외 처리
			.and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)// 시큐리티는 기본적으로 세션을 사용 // 여기서는 세션을 사용하지 않기 때문에 세션 설정을 Stateless 로 설정
            .and()
            
            // 로그인, 회원가입 API 는 토큰이 없는 상태로 요청 들어오니 이 두 개 허용 해주기 !!
			.authorizeRequests().antMatchers("/account/auth/**").permitAll() // 특정 URL을 설정하며, permitAll()은 antMatchers에서 설정한 URL의 접근을 인증없이 허용
			.anyRequest().authenticated() // 모든 리소스가 인증을 해야만 접근이 허용
			.and()
	        .addFilterBefore(new JwtAuthenticationFilter(jwtProvider, accountDetailsService),
	                UsernamePasswordAuthenticationFilter.class); // customFilter (JwtAuthenticationFilter) 를 UsernamePasswordAuthenticationFilter보다 앞에 설정하여 먼저 필터링 하도록 하는 부분
		
		// CORS Error 나올 시 아래 코드 주석 풀기.
	    http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());

		// http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		return http.build();
	}
}