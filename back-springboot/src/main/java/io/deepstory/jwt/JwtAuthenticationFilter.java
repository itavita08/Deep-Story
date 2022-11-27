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
		
		String authorization = request.getHeader("Authorization");
		
		if (!Objects.isNull(authorization)) {
			
			String atk = authorization.substring(7);
			
			try {
				
				Subject subject = jwtProvider.getSubject(atk);
				
                String requestURI = request.getRequestURI();
                
                if (subject.getTokenType().equals("RTK") && !requestURI.equals("/account/reissue")) {
                    throw new JwtException("토큰을 확인하세요.");
                }

				UserDetails userDetails = accountDetailsService.loadUserByUsername(subject.getAccountEmail());
				
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
