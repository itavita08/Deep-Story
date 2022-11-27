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


@ApiModel(value = "로그인 정보 : LoginRequest", description = "로그인 정보")
@XmlRootElement(name= "loginRequest")
@XmlType(propOrder = {"accountEmail", "accountPassword"})

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class LoginRequestDTO {
	@ApiModelProperty(value = "이메일", required = true, example = "xxxxx@email.com")
    private String accountEmail;
	@ApiModelProperty(value = "비밀번호", required = true, example = "xxxxxxxx")
    private String accountPassword;

}
