package io.deepstory.model;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.deepstory.model.entity.ElkUserLogEntity;
import io.deepstory.exception.BadRequestException;
import io.deepstory.model.dto.AccountDTO;
import io.deepstory.model.dto.LoginRequestDTO;
import io.deepstory.model.dto.SignUpRequestDTO;
import io.deepstory.model.entity.AccountEntity;
import io.deepstory.model.repository.AccountRepository;
import io.deepstory.model.repository.ElkUserLogRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService {

	private final AccountRepository accountRepository;
	private final PasswordEncoder passwordEncoder;
	private final ElkUserLogRepository elkUserLogRepository;

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

    
    public List<Integer> getGender() {
        
        List<Integer> countGender = accountRepository.getCountGender();
        System.out.println(countGender);
        
        return countGender;
    }

    public int getTotalUser() {
        
        int totalUser = accountRepository.getTotalUser();
        
        return totalUser;
    }
    

    public Map<String,List<Integer>> getAge() {
        
        List<String> dateF = accountRepository.getYearF();
        List<String> dateM = accountRepository.getYearM();
        
        LocalDate now = LocalDate.now();
        
        int y = now.getYear();
        
        List<Integer> yearF = dateF.stream().map(c -> y - Integer.parseInt(c)).collect(Collectors.toList());
        List<Integer> yearM = dateM.stream().map(c -> y - Integer.parseInt(c)).collect(Collectors.toList());
        
        Map<String,List<Integer>> map = new HashMap<String, List<Integer>>();
        map.put("남자", yearM);
        map.put("여자", yearF);
        
        System.out.println(map.get("남자"));
        System.out.println(map.get("여자"));
        
        return map;
        
    }
    
    @Transactional
    public void userJoinTime() {
        
        long now = (new Date()).getTime();
        Date now1 = new Date(now);
        
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String nowDate = dateFormat.format(now1);
        
        ElkUserLogEntity userLog = ElkUserLogEntity.builder().elkLoginTime(nowDate).build();
        
        elkUserLogRepository.save(userLog);
        
    }

    public List<List<Integer>> getTime() {
        List<Integer> logTime = elkUserLogRepository.getTime();
        List<Integer> logTime1 = elkUserLogRepository.getTime1();
        List<Integer> logTime2 = elkUserLogRepository.getTime2();
        
//        HashMap<String,List<Integer>> map = new HashMap<String,List<Integer>>();
//        map.put("Total", logTime);
//        map.put("Jan", logTime1);
//        map.put("Feb", logTime2);
        
        List<List<Integer>> list = new ArrayList<List<Integer>>();
        list.add(logTime);
        list.add(logTime1);
        list.add(logTime2);
        
        System.out.println(logTime);
        
        return list;
    }
}

