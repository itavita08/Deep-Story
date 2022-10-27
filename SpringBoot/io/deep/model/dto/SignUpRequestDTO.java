package io.deep.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/* 회원 가입 요청을 위해 DTO */

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Builder
@ToString
public class SignUpRequestDTO {

    private String accountEmail;

    private String accountName;

    private String accountPassword;
    
    private String accountDate;
    
    private String accountGender;
}
