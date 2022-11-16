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

	@Bean
	public PasswordEncoder passwordEncoder() {

		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http.cors().and().csrf().disable().exceptionHandling().authenticationEntryPoint(customAuthenticationEntryPoint)
				.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.authorizeRequests()
				.antMatchers("/csrf", "/swagger-resources/**", "/webjars/**", "/h2-console/**", "/board/read",
						"/favicon.ico", "/board/all", "/board/best", "/board/search", "/board/searchUserPost",
						"/board/best", "/swagger-ui", "/swagger-ui.html", "/swagger-ui/index.html", "/v2/api-docs",
						"/auth/**")
				.permitAll().anyRequest().authenticated().and()
				.addFilterBefore(new JwtAuthenticationFilter(jwtProvider, accountDetailsService),
						UsernamePasswordAuthenticationFilter.class);

		http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());

		return http.build();

	}

}