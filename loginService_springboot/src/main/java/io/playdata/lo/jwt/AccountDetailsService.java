package io.playdata.lo.jwt;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import io.playdata.lo.domain.etity.Account;
import io.playdata.lo.model.repositoy.AccountRepository;
import lombok.RequiredArgsConstructor;

/** Spring Security에 유저 정보를 관리 - 해당 유저 확인  **/

@Service
@RequiredArgsConstructor
public class AccountDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        
    	Account account = accountRepository
                .findByAccountEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
        
    	return new AccountDetails(account);
    }
}