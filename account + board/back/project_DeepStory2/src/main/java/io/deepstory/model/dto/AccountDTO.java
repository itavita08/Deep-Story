package io.deepstory.model.dto;

import io.deepstory.model.entity.AccountEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/* 유저의 정보를 Response를 보낼때  사용하는 DTO */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AccountDTO {

    private int accountId;

    private String accountEmail;

    private String accountName;

    private String accountPassword;
    
    private String accountDate;
    
    private String accountGender;
    
    private String accountType;

    public static AccountDTO toDTO(AccountEntity account) {
    	
        return new AccountDTO(
                account.getAccountId(),
                account.getAccountEmail(),
                account.getAccountName(),
                account.getAccountPassword(),
                account.getAccountGender(),
                account.getAccountDate(),
                account.getAccountType());
    }
}
