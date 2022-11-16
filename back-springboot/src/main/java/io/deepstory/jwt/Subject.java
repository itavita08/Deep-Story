package io.deepstory.jwt;

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

	private String tokenType; 

	public static Subject atk(int accountId, String accountEmail, String accountName, String accountPassword
			, String accountDate, String accountGender, String accountType) {

		return new Subject(accountId, accountEmail, accountName, accountPassword, accountDate, accountGender, accountType, "ATK");
		
	}

	public static Subject rtk(int accountId, String accountEmail, String accountName, String accountPassword
			, String accountDate, String accountGender, String accountType) {
		
		return new Subject(accountId, accountEmail, accountName, accountPassword, accountDate, accountGender, accountType, "RTK");
		
	}
}
