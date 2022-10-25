package io.playdata.lo.model.dto;

import io.playdata.lo.domain.etity.Account;
import lombok.Getter;

/* 유저의 정보를 Response를 보낼때  사용하는 DTO */

@Getter
public class AccountResponse {

    private final int accountId;

    private final String accountEmail;

    private final String accountName;

    private final String accountPassword;
    
    private final String accountDate;
    
    private final String accountGender;
    
    private final String accountType;

    
    private AccountResponse(int accountId, String accountEmail, String accountName, String accountPassword, String accountDate, String accountGender,  String accountType) {
        
    	this.accountId = accountId;
    	this.accountEmail = accountEmail;
    	this.accountName = accountEmail;
    	this.accountPassword = accountPassword;
    	this.accountDate = accountDate;
    	this.accountGender = accountGender;    	
    	this.accountType= accountType;
    			
    }

    // Response를 보낼때 아래 정보 
    public static AccountResponse of(Account account) {
        return new AccountResponse(
                account.getAccountId(),
                account.getAccountEmail(),
                account.getAccountName(),
                account.getAccountPassword(),
                account.getAccountGender(),
                account.getAccountDate(),
                account.getAccountType());
    }
}
