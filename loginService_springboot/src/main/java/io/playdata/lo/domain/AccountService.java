package io.playdata.lo.domain;

import javax.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.playdata.lo.domain.etity.Account;
import io.playdata.lo.exception.BadRequestException;
import io.playdata.lo.model.dto.AccountResponse;
import io.playdata.lo.model.dto.LoginRequest;
import io.playdata.lo.model.dto.SignUpRequest;
import io.playdata.lo.model.repositoy.AccountRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService {

	private final AccountRepository accountRepository;
	private final PasswordEncoder passwordEncoder;

	/* 회원가입 */
	@Transactional
	public AccountResponse signUp(SignUpRequest signUpRequest) {
		
		// 이메일 중복 확인
		boolean isExist = accountRepository.existsByEmail(signUpRequest.getEmail());

		if (isExist)
			throw new BadRequestException("이미 존재하는 이메일입니다.");

		// 비밀번호 암호화 !!
		String encodedPassword = passwordEncoder.encode(signUpRequest.getPassword());

		Account account = new Account(signUpRequest.getEmail(), encodedPassword, signUpRequest.getNickname());

		// 회원 가입 정보 DB insert
		account = accountRepository.save(account);

		return AccountResponse.of(account);
	}
	
	/* 로그인 */
    @Transactional
    public AccountResponse login(LoginRequest loginRequest) {
    	
    	// 이메일 확인
        Account account = accountRepository
                .findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new BadRequestException("아이디 혹은 비밀번호를 확인하세요."));

        // 비밀번호 확인
        boolean matches = passwordEncoder.matches(
                loginRequest.getPassword(),
                account.getPassword());
        
        if (!matches) throw new BadRequestException("아이디 혹은 비밀번호를 확인하세요.");

        return AccountResponse.of(account);
    }
}

