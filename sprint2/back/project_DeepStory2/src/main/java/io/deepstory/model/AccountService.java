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

	// 회원가입 
	@Transactional
	public AccountDTO signUp(SignUpRequestDTO signUpRequest) {
		
		boolean isExist = accountRepository.existsByAccountEmail(signUpRequest.getAccountEmail());

		if (isExist)
			
			throw new BadRequestException("이미 존재하는 이메일입니다.");

		String encodedPassword = passwordEncoder.encode(signUpRequest.getAccountPassword());

		
		AccountEntity account = AccountEntity.builder().accountEmail(signUpRequest.getAccountEmail()).accountName(signUpRequest.getAccountName()).accountPassword(encodedPassword).accountDate(signUpRequest.getAccountDate()).accountGender(signUpRequest.getAccountGender()).accountType("user").build();
		
		account = accountRepository.save(account);
		
		return AccountDTO.toDTO(account);
	}
	
	// 로그인 
    @Transactional
    public AccountDTO login(LoginRequestDTO loginRequest) {
    	
        AccountEntity account = accountRepository
                .findByAccountEmail(loginRequest.getAccountEmail())
                .orElseThrow(() -> new BadRequestException("아이디 혹은 비밀번호를 확인하세요."));

        boolean matches = passwordEncoder.matches(
                loginRequest.getAccountPassword(),
                account.getAccountPassword());
        
        if (!matches) throw new BadRequestException("아이디 혹은 비밀번호를 확인하세요.");

        return AccountDTO.toDTO(account);
    }
}

