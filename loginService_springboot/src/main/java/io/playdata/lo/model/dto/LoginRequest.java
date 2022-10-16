package io.playdata.lo.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

/* 회원 가입 요청을 위하 DTO */

@Getter
@AllArgsConstructor
public class LoginRequest {

    private final String email;

    private final String password;

}
