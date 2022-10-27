package io.deep.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Builder
@ToString
public class SignUpRequestDTO {

	private String accountEmail;

    private String accountName;

    private String accountPassword;
    
    private String accountDate;
    
    private String accountGender;
}
