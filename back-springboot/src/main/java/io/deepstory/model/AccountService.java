package io.deepstory.model;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.deepstory.exception.ServerErrorRequestException;
import io.deepstory.model.dto.AccountDTO;
import io.deepstory.model.dto.LoginRequestDTO;
import io.deepstory.model.dto.SignUpRequestDTO;
import io.deepstory.model.entity.AccountEntity;
import io.deepstory.model.entity.ElkUserLogEntity;
import io.deepstory.model.repository.AccountRepository;
import io.deepstory.model.repository.ElkUserLogRepository;

@Service
public class AccountService {

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private ElkUserLogRepository elkUserLogRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Transactional
	public AccountDTO signUp(SignUpRequestDTO signUpRequest) throws Exception {

		String email = signUpRequest.getAccountEmail();
		String accountDate = signUpRequest.getAccountDate();

		boolean isExist = accountRepository.existsByAccountEmail(email);

		if (isExist) {
			
			throw new ServerErrorRequestException("이미 존재하는 이메일입니다. 다시 시도해주세요.");
		}

		int at = email.indexOf("@");
		int dot = email.indexOf(".");

		if (at == -1 || dot == -1 || at > dot) {

			throw new ServerErrorRequestException("이메일 양식에 맞지 않습니다. 다시 시도해주세요.");
		}

		try {

			Pattern pattern = Pattern.compile("(19|20)\\d{2}\\-((11|12)|(0?(\\d)))\\-(30|31|((0|1|2)?\\d))");

			Matcher matcher = pattern.matcher(accountDate);

			if (matcher.find() == false) {

				throw new ServerErrorRequestException("날짜 기입 양식에 맞지 않습니다. 다시 시도해주세요.");
			}

		} catch (Exception e) {

			throw new ServerErrorRequestException("날짜 기입 양식에 맞지 않습니다. 다시 시도해주세요.");
		}

		String encodedPassword = passwordEncoder.encode(signUpRequest.getAccountPassword());

		AccountEntity account = AccountEntity.builder().accountEmail(signUpRequest.getAccountEmail())
				.accountName(signUpRequest.getAccountName()).accountPassword(encodedPassword)
				.accountDate(signUpRequest.getAccountDate()).accountGender(signUpRequest.getAccountGender())
				.accountType("user").build();

		account = accountRepository.save(account);

		return AccountDTO.toDTO(account);

	}

	@Transactional
	public AccountDTO login(LoginRequestDTO loginRequest) throws Exception {

		AccountEntity account = accountRepository.findByAccountEmail(loginRequest.getAccountEmail())
				.orElseThrow(() -> new ServerErrorRequestException("아이디를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."));

		boolean matches = passwordEncoder.matches(loginRequest.getAccountPassword(), account.getAccountPassword());

		if (!matches) {

			throw new ServerErrorRequestException("비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.");
		}

		return AccountDTO.toDTO(account);
	}

	public List<Integer> getGender() throws Exception {

		List<Integer> countGender = accountRepository.getCountGender();

		return countGender;

	}

	public int getTotalUser() throws Exception {

		int totalUser = accountRepository.getTotalUser();

		return totalUser;

	}

	public Map<String, List<Integer>> getAge() throws Exception {

		List<String> dateF = accountRepository.getYearF();
		List<String> dateM = accountRepository.getYearM();

		LocalDate now = LocalDate.now();

		int y = now.getYear();

		List<Integer> yearF = dateF.stream().map(c -> y - Integer.parseInt(c)).collect(Collectors.toList());
		List<Integer> yearM = dateM.stream().map(c -> y - Integer.parseInt(c)).collect(Collectors.toList());

		Map<String, List<Integer>> map = new HashMap<String, List<Integer>>();

		map.put("남자", yearM);
		map.put("여자", yearF);

		return map;

	}

	@Transactional
	public void userJoinTime() throws Exception {

		long now = (new Date()).getTime();
		Date now1 = new Date(now);

		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String nowDate = dateFormat.format(now1);

		ElkUserLogEntity userLog = ElkUserLogEntity.builder().elkLoginTime(nowDate).build();

		elkUserLogRepository.save(userLog);

	}

	public List<List<Integer>> getTime() throws Exception {
		
		List<Integer> logTime = elkUserLogRepository.getTime();
		List<Integer> logTime1 = elkUserLogRepository.getTime1();
		List<Integer> logTime2 = elkUserLogRepository.getTime2();

		List<List<Integer>> list = new ArrayList<List<Integer>>();
		
		list.add(logTime);
		list.add(logTime1);
		list.add(logTime2);

		return list;
		
	}

}
