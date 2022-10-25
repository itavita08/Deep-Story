package io.playdata.lo.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

/* 회원 가입 요청을 위해 DTO */

@Getter
@AllArgsConstructor
public class SignUpRequest {

    private final String accountEmail;

    private final String accountName;

    private final String accountPassword;
    
    private final String accountDate;
    
    private final String accountGender;
}
