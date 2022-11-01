package io.deepstory.model;

import javax.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.deepstory.exception.BadRequestException;
import io.deepstory.model.dto.AccountDTO;
import io.deepstory.model.dto.LoginRequestDTO;
import io.deepstory.model.dto.SignUpRequestDTO;
import io.deepstory.model.entity.AccountEntity;
import io.deepstory.model.repository.AccountRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService {

	private final AccountRepository accountRepository;
	private final PasswordEncoder passwordEncoder;

	/* 회원가입 */
	@Transactional
	public AccountDTO signUp(SignUpRequestDTO signUpRequest) {
		
		
		
		// 이메일 중복 확인
		boolean isExist = accountRepository.existsByAccountEmail(signUpRequest.getAccountEmail());

		if (isExist)
			
			throw new BadRequestException("이미 존재하는 이메일입니다.");

		// 비밀번호 암호화 !!
		String encodedPassword = passwordEncoder.encode(signUpRequest.getAccountPassword());

		System.out.println(encodedPassword);
		
		AccountEntity account = AccountEntity.builder().accountEmail(signUpRequest.getAccountEmail()).accountName(signUpRequest.getAccountName()).accountPassword(encodedPassword).accountDate(signUpRequest.getAccountDate()).accountGender(signUpRequest.getAccountGender()).accountType("user").build();
		
		// 회원 가입 정보 DB insert
		account = accountRepository.save(account);

		System.out.println("회원 가입 성공");
		// 비밀 번호 제외한 account 객체 반환
		return AccountDTO.toDTO(account);
	}
	
	/* 로그인 */
    @Transactional
    public AccountDTO login(LoginRequestDTO loginRequest) {
    	
    	// 이메일 확인
        AccountEntity account = accountRepository
                .findByAccountEmail(loginRequest.getAccountEmail())
                .orElseThrow(() -> new BadRequestException("아이디 혹은 비밀번호를 확인하세요."));

        // 비밀번호 확인
        boolean matches = passwordEncoder.matches(
                loginRequest.getAccountPassword(),
                account.getAccountPassword());
        
        if (!matches) throw new BadRequestException("아이디 혹은 비밀번호를 확인하세요.");

     // 비밀 번호 제외하고 반환
        return AccountDTO.toDTO(account);
    }
}

