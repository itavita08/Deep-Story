package io.playdata.lo.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

/* 로그인 요청을 위해 DTO */

@Getter
@AllArgsConstructor
public class LoginRequest {

    private final String accountEmail;
    private final String accountPassword;

}
