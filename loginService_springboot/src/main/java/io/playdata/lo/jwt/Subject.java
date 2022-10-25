package io.playdata.lo.jwt;

import lombok.Getter;

@Getter
public class Subject {

	private final int account_id;

	private final String account_email;

	private final String account_name;

	private final String account_password;

	private final String account_date;
	
	private final String account_gender;

	private final String account_type;

	private final String token_type; // ATK, RTK // 토큰의 payload(Subject)의 type을 통해 ATK인지 RTK인지 구분하기 위해

	
	public Subject(int account_id, String account_email, String account_name, String account_password
			, String account_date, String account_gender, String account_type, String token_type) {
		this.account_id = account_id;
		this.account_email = account_email;
		this.account_name = account_name;
		this.account_password = account_password;
		this.account_date = account_date;
		this.account_gender = account_gender;
		this.account_type = account_type;
		this.token_type = token_type;
		
	}

	// atk
	public static Subject atk(int account_id, String account_email, String account_name, String account_password,
			String account_gender, String account_date, String account_type) {
		return new Subject(account_id, account_email, account_name,  account_password, account_date, account_gender, account_type, "ATK");
	}

	// rtk
	public static Subject rtk(int account_id, String account_email, String account_name, String account_password,
			String account_gender, String account_date, String account_type) {
		return new Subject(account_id, account_email, account_name,  account_password, account_date,  account_gender, account_type, "RTK");
	}
}
