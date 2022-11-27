package io.deepstory.model.dto;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import io.deepstory.model.entity.AccountEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/* 유저의 정보를 Response를 보낼때  사용하는 DTO */
@ApiModel(value = "회원 정보 ", description = "회원 정보")
@XmlRootElement(name= "")
@XmlType(propOrder = {"accountId","accountEmail","accountName","accountPassword","accountDate","accountGender","accountType"})
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AccountDTO {
	@ApiModelProperty(value = "아이디", required = true, example = "n")
    private int accountId;
    @ApiModelProperty(value = "이메일", required = true, example = "test@gmail.com")
    private String accountEmail;
    @ApiModelProperty(value = "닉네임", required = true, example = "엔코아")
    private String accountName;
    @ApiModelProperty(value = "비밀번호", required = true, example = "xxxxxxxx")
    private String accountPassword;
    @ApiModelProperty(value = "생년월일", required = true, example = "YYYY-MM-DD")
    private String accountDate;
    @ApiModelProperty(value = "성별", required = true, example = "female,male")
    private String accountGender;
    @ApiModelProperty(value = "타입", required = true, example = "type")
    private String accountType;

    public static AccountDTO toDTO(AccountEntity account) {
    	
        return new AccountDTO(
                account.getAccountId(),
                account.getAccountEmail(),
                account.getAccountName(),
                account.getAccountPassword(),
                account.getAccountDate(),
                account.getAccountGender(),
                account.getAccountType());
    }
}
