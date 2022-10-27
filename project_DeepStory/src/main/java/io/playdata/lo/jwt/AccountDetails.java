package io.playdata.lo.jwt;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import io.playdata.lo.model.domain.AccountEntity;
import lombok.Getter;

@Getter
public class AccountDetails extends User {

    private final AccountEntity account;

    public AccountDetails(AccountEntity account) {
        super(account.getAccountEmail(), account.getAccountPassword(), List.of(new SimpleGrantedAuthority("USER")));
        this.account = account;
    }
}
