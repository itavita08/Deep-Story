package io.playdata.lo.model.dto;

import io.playdata.lo.domain.etity.Account;
import lombok.Getter;

/* 회원가입 성공 시 아주 간단하게 유저의 정보를 응답하기 위해 범용적으로 사용 가능한 DTO */

@Getter
public class AccountResponse {

    private final int accountId;

    private final String email;

    private final String nickname;

    private AccountResponse(int accountId, String email, String nickname) {
        this.accountId = accountId;
        this.email = email;
        this.nickname = nickname;
    }

    public static AccountResponse of(Account account) {
        return new AccountResponse(
                account.getId(),
                account.getEmail(),
                account.getNickname());
    }
}
