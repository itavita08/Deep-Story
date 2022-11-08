package io.deepstory.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class SecretFriendListDTO {

	private int secretFriendId;

	private int friendId;
	
	private String friendEmail;
	
	private String friendName;

	private String boardName;

}
