package io.playdata.lo.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Subject {

	private int accountId;

	private String accountEmail;

	private String accountName;

	private String accountPassword;

	private String accountDate;
	
	private String accountGender;

	private String accountType;

	private String tokenType; // ATK, RTK // 토큰의 payload(Subject)의 type을 통해 ATK인지 RTK인지 구분하기 위해


	// atk
	public static Subject atk(int accountId, String accountEmail, String accountName, String accountPassword
			, String accountDate, String accountGender, String accountType) {
		return new Subject(accountId, accountEmail, accountName, accountPassword, accountDate, accountGender, accountType, "ATK");
	}

	// rtk
	public static Subject rtk(int accountId, String accountEmail, String accountName, String accountPassword
			, String accountDate, String accountGender, String accountType) {
		return new Subject(accountId, accountEmail, accountName, accountPassword, accountDate, accountGender, accountType, "RTK");
	}
}
