package io.playdata.lo.jwt;

import lombok.Getter;

@Getter
public class Subject {

    private final int accountId;

    private final String email;

    private final String nickname;

    private final String type;

    private Subject(int accountId, String email, String nickname, String type) {
        this.accountId = accountId;
        this.email = email;
        this.nickname = nickname;
        this.type = type;
    }

    // atk
    public static Subject atk(int accountId, String email, String nickname) {
        return new Subject(accountId, email, nickname, "ATK");
    }

    public static Subject rtk(int accountId, String email, String nickname) {
        return new Subject(accountId, email, nickname, "RTK");
    }
}
