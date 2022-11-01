package io.deepstory.jwt;

import java.io.IOException;
import java.util.Objects;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.JwtException;

// 기본적으로 Filter로 수행되는 것은 Form기반의 아이디와 비밀번호로 진행되는 UsernamePasswordAuthenticationFilter가 수행
// CustomFilter (UsernamePasswordAuthenticationFilter보다 먼저 걸리도록)
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtProvider jwtProvider;
	private final AccountDetailsService accountDetailsService;

	public JwtAuthenticationFilter(JwtProvider jwtProvider, AccountDetailsService accountDetailsService) {
		this.jwtProvider = jwtProvider;
		this.accountDetailsService = accountDetailsService;
	}


	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		// Request Header 에서 atk 토큰 정보를 꺼내오기
		String authorization = request.getHeader("Authorization");
		
		if (!Objects.isNull(authorization)) {
			
			String atk = authorization.substring(7);
			
			try {
				
				// atk 로 해당 유저 정보 불러오기
				Subject subject = jwtProvider.getSubject(atk);
				
				// url이  "/account/reissue" 재발급 요청이 아니고
				// rtk 토큰 타입이라면 예외처리
                String requestURI = request.getRequestURI();
                
                if (subject.getTokenType().equals("RTK") && !requestURI.equals("/account/reissue")) {
                    throw new JwtException("토큰을 확인하세요.");
                }

				
				
				UserDetails userDetails = accountDetailsService.loadUserByUsername(subject.getAccountEmail());
				
				// UsernamePasswordAuthenticationToken:  username, password를 쓰는 form기반 인증을 처리하는 필터.
				// AuthenticationManager를 통한 인증 실행
				// 성공하면, Authentication 객체를 SecurityContext에 저장 후 AuthenticationSuccessHandler 실행
				// 실패하면, AuthenticationFailureHandler 실행
				Authentication token = new UsernamePasswordAuthenticationToken(userDetails, "",
						userDetails.getAuthorities());
				
				SecurityContextHolder.getContext().setAuthentication(token);
				
				
			} catch (JwtException e) {
				request.setAttribute("exception", e.getMessage());
			}
		}
		filterChain.doFilter(request, response);
	}
}
