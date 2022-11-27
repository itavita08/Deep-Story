package io.deepstory.model.dto;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/* 회원 가입 요청을 위해 DTO */
@ApiModel(value = "회원가입 : signUpRequest", description = "회원가입 정보")
@XmlRootElement(name= "signUpRequest")
@XmlType(propOrder = {"accountEmail","accountName","accountPassword","accountDate","accountGender"})
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class SignUpRequestDTO {
	@ApiModelProperty(value = "이메일", required = true, example = "xxxxx@email.com")
    private String accountEmail;
	@ApiModelProperty(value = "이름", required = true, example = "엔코아")
    private String accountName;
	@ApiModelProperty(value = "비밀번호", required = true, example = "xxxxxxxx")
    private String accountPassword;
	@ApiModelProperty(value = "생년월일", required = true, example = "YYYY-MM-DD")
    private String accountDate;
	@ApiModelProperty(value = "성별", required = true, example = "female or male")
    private String accountGender;
}
