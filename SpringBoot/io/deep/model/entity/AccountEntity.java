package io.deep.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
//@RequiredArgsConstructor
@Table(name="account_privacy")
public class AccountEntity {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private int accountId;

    @Column(name = "account_email")
   // @NotNull
    private String accountEmail;

    @Column(name = "account_name")
    //@NotNull
    private String accountName;

    @Column(name = "account_password")
   // @NotNull
    private String accountPassword;

    @Column(name = "account_gender")
    //@NotNull
    private String accountGender;
    
    @Column(name = "account_date")
    //@NotNull
    private String accountDate;
    
    @Column(name = "account_type")
    //@NotNull
    private String accountType;
}