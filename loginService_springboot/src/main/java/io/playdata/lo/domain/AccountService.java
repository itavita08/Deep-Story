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
		boolean isExist = accountRepository.existsByAccountEmail(signUpRequest.getAccountEmail());

		if (isExist)
			
			throw new BadRequestException("이미 존재하는 이메일입니다.");

		// 비밀번호 암호화 !!
		String encodedPassword = passwordEncoder.encode(signUpRequest.getAccountPassword());

		System.out.println(encodedPassword);
		
		Account account = new Account(signUpRequest.getAccountEmail(), signUpRequest.getAccountName(), encodedPassword, signUpRequest.getAccountGender(), signUpRequest.getAccountDate(), "user");

		// 회원 가입 정보 DB insert
		account = accountRepository.save(account);

		System.out.println("회원 가입 성공");
		// 비밀 번호 제외한 account 객체 반환
		return AccountResponse.of(account);
	}
	
	/* 로그인 */
    @Transactional
    public AccountResponse login(LoginRequest loginRequest) {
    	
    	// 이메일 확인
        Account account = accountRepository
                .findByAccountEmail(loginRequest.getAccountEmail())
                .orElseThrow(() -> new BadRequestException("아이디 혹은 비밀번호를 확인하세요."));
        
        System.out.println(loginRequest.getAccountPassword());
        System.out.println(account.getAccountPassword());

        // 비밀번호 확인
        boolean matches = passwordEncoder.matches(
                loginRequest.getAccountPassword(),
                account.getAccountPassword());
        
        if (!matches) throw new BadRequestException("아이디 혹은 비밀번호를 확인하세요.");

     // 비밀 번호 제외하고 반환
        return AccountResponse.of(account);
    }
}

