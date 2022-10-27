package io.deep.model.dto;

import io.deep.model.entity.AccountEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/* 유저의 정보를 Response를 보낼때  사용하는 DTO */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class AccountDTO {

    private int accountId;

    private String accountEmail;

    private String accountName;

    private String accountPassword;
    
    private String accountDate;
    
    private String accountGender;
    
    private String accountType;


    // Response를 보낼때 아래 정보 
    public static AccountDTO of(AccountEntity account) {
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
