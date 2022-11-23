package io.deepstory.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class SecretFriendAccountDTO {
	
	private int secretFriendId;
	
    private int friendId;

    private String friendEmail;

    private String friendName;

}
