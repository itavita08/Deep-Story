package io.playdata.lo.jwt;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import io.playdata.lo.domain.etity.Account;
import lombok.Getter;

@Getter
public class AccountDetails extends User {

    private final Account account;

    public AccountDetails(Account account) {
        super(account.getAccountEmail(), account.getAccountPassword(), List.of(new SimpleGrantedAuthority("USER")));
        this.account = account;
    }
}
