package io.deepstory.model.entity;

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
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="account_privacy")
public class AccountEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private int accountId;

    @Column(name = "account_email")
    private String accountEmail;

    @Column(name = "account_name")
    private String accountName;

    @Column(name = "account_password")
    private String accountPassword;

    @Column(name = "account_gender")
    private String accountGender;
    
    @Column(name = "account_date")
    private String accountDate;
    
    @Column(name = "account_type")
    private String accountType;

}
